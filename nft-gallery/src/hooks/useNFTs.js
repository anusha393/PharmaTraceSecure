import { useEffect, useState } from "react";
import { fetchMetadata } from "../utils/fetchTokenURI";

export const useNFTs = () => {
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    const loadNFT = async () => {
      const data = await fetchMetadata();
      setMetadata(data);
    };
    loadNFT();
  }, []);

  return metadata;
};
