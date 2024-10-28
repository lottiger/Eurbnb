'use client';

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import ApartmentCard from './apartment-card';
import { Id } from '@/convex/_generated/dataModel';

type ApartmentData = {
  _id: Id<"apartments">;
  title: string;
  description: string;
  bedrooms: number;
  beds: number;
  price: number;
  images: string[];
  country: string;
  city: string;
};

const FavoriteList: React.FC = () => {
  const favoriteApartments = useQuery(api.functions.favorites.getUserFavorites) as ApartmentData[] | null;
  const toggleFavoriteMutation = useMutation(api.functions.favorites.toggleFavorite);

  const [favoritedApartments, setFavoritedApartments] = useState<Id<"apartments">[]>([]);

  useEffect(() => {
    // Sätter initiala favoriter från databasen
    if (favoriteApartments) {
      setFavoritedApartments(favoriteApartments.map((apartment) => apartment._id));
    }
  }, [favoriteApartments]);

  const handleToggleFavorite = async (apartmentId: Id<"apartments">) => {
    try {
      await toggleFavoriteMutation({ apartmentId });
      setFavoritedApartments((prev) =>
        prev.includes(apartmentId)
          ? prev.filter((id) => id !== apartmentId) // Ta bort från lokala favoriter
          : [...prev, apartmentId] // Lägg till i lokala favoriter
      );
    } catch (error) {
      console.error("Misslyckades att ändra favoriter", error);
    }
  };

  if (!favoriteApartments) {
    return <div>Laddar favoriter...</div>;
  }

  if (favoriteApartments.length === 0) {
    return <div>Du har inga favoritmarkerade lägenheter än.</div>;
  }

  return (
    <div className="flex flex-wrap gap-[86px] justify-center mx-36">
      {favoriteApartments.map((apartment) => (
        <ApartmentCard
          key={apartment._id.toString()}
          apartmentId={apartment._id}
          title={apartment.title}
          description={apartment.description}
          bedrooms={apartment.bedrooms}
          beds={apartment.beds}
          price={apartment.price}
          images={apartment.images}
          isFavorited={favoritedApartments.includes(apartment._id)}
          onToggleFavorite={() => handleToggleFavorite(apartment._id)}
        />
      ))}
    </div>
  );
};

export default FavoriteList;
