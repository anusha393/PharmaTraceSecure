// import { IPFS_GATEWAY, METADATA_CID } from "../constants";
export const IPFS_GATEWAY = "https://gateway.lighthouse.storage/ipfs";

export const METADATA_CID = "bafkreih6l36d57ywle3345erf6vn4ffez4yx5ajgchps36ejokv2hq2b4m";


export const fetchMetadata = async () => {
    try {
      const res = await fetch(`${IPFS_GATEWAY}/${METADATA_CID}`);
      console.log("Metadata fetch status:", res.status);
      const json = await res.json();
      console.log("Fetched metadata:", json);
      return json;
    } catch (err) {
      console.error("Failed to fetch metadata:", err);
      return null;
    }
  };
