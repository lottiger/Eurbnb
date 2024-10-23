'use client';

import React from 'react';
import ImageCarousel from './image-carousel';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel'; // Importera Id-typen
import { useUser } from '@clerk/nextjs'; // Clerk-användarhook
import FavoriteButton from './favorites-button';

interface ApartmentImageProps {
  images: string[];
  apartmentId: Id<"apartments">;
  isFavorited: boolean;
  onToggleFavorite: () => void;
}

const ApartmentImage: React.FC<ApartmentImageProps> = ({ images, apartmentId, isFavorited, onToggleFavorite }) => {
  const toggleFavoriteMutation = useMutation(api.functions.favorites.toggleFavorite);
  const { user, isSignedIn } = useUser(); // Hämta den aktuella användaren från Clerk

  const handleToggleFavorite = async () => {
    if (!user || !isSignedIn) {
      console.error("User not authenticated");
      return; // Se till att användaren är autentiserad
    }

    try {
      // Skicka apartmentId i mutationen
      await toggleFavoriteMutation({ apartmentId });
      onToggleFavorite(); // Uppdatera UI:t när favoriten togglas
    } catch (error) {
      console.error("Failed to toggle favorite", error);
    }
  };

  return (
    <div className="relative">
      <ImageCarousel images={images} />
      <FavoriteButton isFavorited={isFavorited} onToggle={handleToggleFavorite} />
    </div>
  );
};

export default ApartmentImage;
