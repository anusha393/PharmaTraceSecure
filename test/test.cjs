const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PharmaTraceSecure", function () {
  let contract, owner, manufacturer, holder, outsider;
  let batchId, drugName, cid, manufactureDate;

  beforeEach(async () => {
    [owner, manufacturer, holder, outsider] = await ethers.getSigners();

    const PharmaTraceSecure = await ethers.getContractFactory("PharmaTraceSecure");
    contract = await PharmaTraceSecure.connect(owner).deploy();

    batchId = ethers.encodeBytes32String("B001");
    drugName = "Paracetamol";
    cid = "QmHash123ABC";
    manufactureDate = Math.floor(Date.now() / 1000) - 1000;
  });

  describe("Deployment", function () {
    it("should set deployer as owner and initial manufacturer", async () => {
      expect(await contract.owner()).to.equal(owner.address);
      expect(await contract.isManufacturer(owner.address)).to.be.true;
    });
  });

  describe("Manufacturer Whitelist", function () {
    it("allows owner to whitelist new manufacturer", async () => {
      await expect(contract.connect(owner).addManufacturer(manufacturer.address))
        .to.emit(contract, "ManufacturerWhitelisted")
        .withArgs(manufacturer.address);

      expect(await contract.isManufacturer(manufacturer.address)).to.be.true;
    });

    it("should revert if non-owner tries to whitelist", async () => {
      await expect(
        contract.connect(outsider).addManufacturer(manufacturer.address)
      ).to.be.revertedWithCustomError(contract, "OwnableUnauthorizedAccount");
    });
  });

  describe("Batch Registration", function () {
    beforeEach(async () => {
      await contract.connect(owner).addManufacturer(manufacturer.address);
    });

    it("should register a new batch", async () => {
      await expect(
        contract.connect(manufacturer).registerBatch(batchId, drugName, manufactureDate, cid)
      )
        .to.emit(contract, "Registered")
        .withArgs(batchId, manufacturer.address);

      const batch = await contract.getBatch(batchId);
      expect(batch[1]).to.equal(drugName);
      expect(batch[2]).to.equal(manufacturer.address);
      expect(batch[6]).to.equal(0); // Status.Manufactured
    });

    it("should revert if non-manufacturer registers", async () => {
      await expect(
        contract.connect(holder).registerBatch(batchId, drugName, manufactureDate, cid)
      ).to.be.revertedWith("Not authorized manufacturer");
    });

    it("should revert on future manufacture date", async () => {
      const future = manufactureDate + 10000;
      await expect(
        contract.connect(manufacturer).registerBatch(batchId, drugName, future, cid)
      ).to.be.revertedWith("Future manufacture date");
    });
  });

  describe("Transfer and Status", function () {
    beforeEach(async () => {
      await contract.connect(owner).addManufacturer(manufacturer.address);
      await contract.connect(manufacturer).registerBatch(batchId, drugName, manufactureDate, cid);
    });

    it("should allow holder to transfer batch", async () => {
      await expect(
        contract.connect(manufacturer).transfer(batchId, holder.address)
      )
        .to.emit(contract, "Transferred")
        .withArgs(batchId, manufacturer.address, holder.address);

      const batch = await contract.getBatch(batchId);
      expect(batch[5]).to.equal(holder.address);
      expect(batch[6]).to.equal(1); // Status.InTransit
    });

    it("should allow new holder to update status", async () => {
      await contract.connect(manufacturer).transfer(batchId, holder.address);
      await expect(contract.connect(holder).updateStatus(batchId, 2))
        .to.emit(contract, "StatusChanged")
        .withArgs(batchId, 2);
    });

    it("should revert if non-holder tries to update status", async () => {
      await expect(
        contract.connect(holder).updateStatus(batchId, 2)
      ).to.be.revertedWith("Not current holder");
    });

    it("should revert on invalid status transition", async () => {
      await contract.connect(manufacturer).transfer(batchId, holder.address);
      await expect(
        contract.connect(holder).updateStatus(batchId, 0)
      ).to.be.revertedWith("Status must move forward");
    });
  });

  describe("Fallback + Receive", function () {
    it("should revert when receiving Ether", async () => {
      await expect(
        owner.sendTransaction({ to: contract.target, value: ethers.parseEther("1") })
      ).to.be.revertedWith("Contract does not accept Ether");
    });

    it("should revert on fallback call with invalid data", async () => {
      const tx = { to: contract.target, data: "0x12345678", value: 0 };
      await expect(owner.sendTransaction(tx)).to.be.revertedWith("Invalid call");
    });
  });

  describe("Utility", function () {
    it("should return a unique batch salt", async () => {
      const salt = await contract.connect(manufacturer).generateBatchSalt();
      expect(salt).to.be.a("bigint");
    });
  });
});
