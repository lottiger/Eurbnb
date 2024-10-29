import React, { useState } from 'react';


interface CarouselProps {
  images: string[]; // En array av bild-URL:er
}

const ImageCarousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Spåra vilken bild som visas

  // Gå till nästa bild
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Gå till föregående bild
  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-[200px] h-[165px]">
      <img
        src={images[currentIndex]}
        alt={`Bild ${currentIndex + 1}`}
        className="w-full h-full object-cover rounded-lg"
      />
      
      {/* Knapp för att gå till föregående bild */}
      <button
        onClick={prevImage}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 text-black p-2"
      >
        {/* &#8592; */}
      </button>

      {/* Knapp för att gå till nästa bild */}
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 text-black p-2 "
      >
        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.16663 10.0001H15.8333M15.8333 10.0001L9.99996 4.16675M15.8333 10.0001L9.99996 15.8334" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

      </button>

      {/* Indikatorer för vilken bild som visas */}
      {/* <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div> */}
    </div>
  );
};

export default ImageCarousel;
