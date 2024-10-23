'use client';

import React from 'react';
 // Importera FavoriteButton-komponenten
import ImageCarousel from './image-carousel'; // Importera ImageCarousel-komponenten
import FavoriteButton from './favorites-button';

interface ApartmentImageProps {
  images: string[]; // Array av bild-URL:er
  isFavorited: boolean;
  onToggleFavorite: () => void; // Funktion för att hantera favoritmarkering
}

const ApartmentImage: React.FC<ApartmentImageProps> = ({ images, isFavorited, onToggleFavorite }) => {
  return (
    <div className="relative"> {/* Lägg till relative så att hjärtat kan positioneras absolut */}
      {/* Lägg till ImageCarousel för att hantera flera bilder */}
      <ImageCarousel images={images} />

      {/* Favoritknappen placerad över bilderna */}
      <FavoriteButton
        isFavorited={isFavorited}
        onToggle={onToggleFavorite}
      />
    </div>
  );
};

export default ApartmentImage;
