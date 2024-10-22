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
    <div className="relative w-[300px] h-[200px]">
      <img
        src={images[currentIndex]}
        alt={`Bild ${currentIndex + 1}`}
        className="w-full h-full object-cover rounded-lg"
      />
      
      {/* Knapp för att gå till föregående bild */}
      <button
        onClick={prevImage}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        &#8592;
      </button>

      {/* Knapp för att gå till nästa bild */}
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        &#8594;
      </button>

      {/* Indikatorer för vilken bild som visas */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
