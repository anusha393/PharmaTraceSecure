import React from "react";
import { useNFTs } from "../hooks/useNFTs";

const Gallery = () => {
  const metadata = useNFTs();

  if (!metadata) return <p>Loading Cosmic Ape...</p>;

//   const imageURL = metadata.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
    // const imageURL = metadata.image.replace("ipfs://", "https://nftstorage.link/ipfs");
    const imageURL = metadata.image.replace("ipfs://", "https://gateway.lighthouse.storage/ipfs/");


  const name = metadata.name;
  const description = metadata.description;

  return (
    <div>
      <h2>{name}</h2>
      <GalleryCard name={metadata.name} description={metadata.description} image={imageURL} />

      
      <p>{description}</p>
    </div>
  );
};

export default Gallery;
