// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";



contract PharmaTraceSecure is Ownable, ReentrancyGuard {
    enum Status { Manufactured, InTransit, Received, Verified }

    struct Batch {
        bytes32 batchId;
        string drugName;
        address manufacturer;
        uint64 manufactureDate;
        string cid; // full IPFS CID
        address holder;
        Status status;
    }

    mapping(bytes32 => Batch) private batches;
    mapping(address => bool) public isManufacturer;
    bytes32[] private batchIds;


    event ManufacturerWhitelisted(address indexed account);
    event Registered(bytes32 indexed batchId, address indexed manufacturer);
    event Transferred(bytes32 indexed batchId, address indexed from, address indexed to);
    event StatusChanged(bytes32 indexed batchId, Status newStatus);
    event UnexpectedCall(address indexed caller, uint256 value);

    modifier onlyManufacturer() {
        require(isManufacturer[msg.sender], "Not authorized manufacturer");
        _;
    }

    modifier onlyHolder(bytes32 batchId) {
        require(batches[batchId].holder == msg.sender, "Not current holder");
        _;
    }

    constructor() {
        isManufacturer[msg.sender] = true;
    }

    function addManufacturer(address account) external onlyOwner {
        require(account != address(0), "Invalid address");
        require(!isManufacturer[account], "Already whitelisted");
        isManufacturer[account] = true;
        emit ManufacturerWhitelisted(account);
    }

    function registerBatch(
        bytes32 batchId,
        string calldata drugName,
        uint64 manufactureDate,
        string calldata cid
    ) external onlyManufacturer {
        require(batchId != bytes32(0), "Invalid batchId");
        require(bytes(drugName).length > 0 && bytes(drugName).length <= 64, "Invalid drug name");
        require(bytes(cid).length > 0 && bytes(cid).length <= 100, "Invalid IPFS CID");
        require(manufactureDate <= block.timestamp, "Future manufacture date");
        require(batches[batchId].manufactureDate == 0, "Batch already exists");

        batches[batchId] = Batch({
            batchId: batchId,
            drugName: drugName,
            manufacturer: msg.sender,
            manufactureDate: manufactureDate,
            cid: cid,
            holder: msg.sender,
            status: Status.Manufactured
        });
        batchIds.push(batchId);

        emit Registered(batchId, msg.sender);
    }

    function transfer(bytes32 batchId, address to) external onlyHolder(batchId) nonReentrant {
        require(to != address(0), "Invalid recipient");

        batches[batchId].holder = to;
        batches[batchId].status = Status.InTransit;

        emit Transferred(batchId, msg.sender, to);
    }

    function updateStatus(bytes32 batchId, Status newStatus) external onlyHolder(batchId) {
        require(uint8(newStatus) > uint8(batches[batchId].status), "Status must move forward");
        batches[batchId].status = newStatus;

        emit StatusChanged(batchId, newStatus);
    }

    function getBatch(bytes32 batchId) external view returns (
        bytes32, string memory, address, uint64, string memory, address, Status
    ) {
        Batch storage b = batches[batchId];
        return (b.batchId, b.drugName, b.manufacturer, b.manufactureDate, b.cid, b.holder, b.status);
    }

   
    function generateBatchSalt() external view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(msg.sender, block.timestamp, blockhash(block.number - 1))));
    }
    function getAllBatchIds() external view returns (bytes32[] memory) {
    return batchIds;
    }


    receive() external payable {
        revert("Contract does not accept Ether");
    }

    fallback() external payable {
        emit UnexpectedCall(msg.sender, msg.value);
        revert("Invalid call");
    }
}
