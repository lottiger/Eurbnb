'use client';

import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import ApartmentCard from './apartment-card';
import { Id } from '@/convex/_generated/dataModel';
import { useFavorites } from '@/context/favorites-context';
import { useAuth } from '@clerk/nextjs'; // Importera Clerk för autentisering

type ApartmentData = {
  _id: Id<"apartments">;
  title: string;
  description: string;
  bedrooms: number;
  beds: number;
  price: number;
  images: string[];
  rating?: number;
  country: string;
  city: string;
};

const FavoriteList = (): JSX.Element => {
  const { isSignedIn } = useAuth(); // Kontrollera om användaren är inloggad
  const favoriteApartments = useQuery(api.functions.favorites.getUserFavorites) as ApartmentData[] | null;
  const { favoritedApartments, toggleFavorite } = useFavorites();

  if (!isSignedIn) {
    return <div>Logga in för att se dina favoriter</div>;
  }

  if (!favoriteApartments) {
    return <div>Laddar favoriter...</div>;
  }

  if (favoriteApartments.length === 0) {
    return <div>Du har inga favoritmarkerade lägenheter än.</div>;
  }

  return (
    <div className="flex flex-wrap gap-[86px] justify-center mx-36">
      {favoriteApartments.map(apartment => (
        <ApartmentCard
          key={apartment._id.toString()}
          apartmentId={apartment._id}
          title={apartment.title}
          description={apartment.description}
          bedrooms={apartment.bedrooms}
          beds={apartment.beds}
          price={apartment.price}
          images={apartment.images}
          rating={apartment.rating}
          isFavorited={favoritedApartments.includes(apartment._id)}
          onToggleFavorite={() => toggleFavorite(apartment._id)}
        />
      ))}
    </div>
  );
};

export default FavoriteList;
