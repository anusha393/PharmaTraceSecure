import React from "react";
import { useNFTs } from "../hooks/useNFTs";
import GalleryCard from '../components/GalleryCard';


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
      <GalleryCard
        name={name}
        description={description}
        image={imageURL}
      />
    </div>
  );
  
};

export default Gallery;
