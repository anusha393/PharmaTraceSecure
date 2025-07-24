const GalleryCard = ({ name, description, image }) => {
    return (
      <div className="bg-slate-800 p-4 rounded-xl w-64 shadow-lg">
        <img src={image} alt={name} className="rounded-md" />
        <h2 className="text-lg mt-3 text-cyan-300">{name}</h2>
        <p className="text-sm text-slate-300">{description}</p>
      </div>
    );
  };
  
  export default GalleryCard;
  