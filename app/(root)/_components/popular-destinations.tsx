'use client';

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import ApartmentCard from './apartment-card'; // Importera ApartmentCard-komponenten
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
  category?: 'offer' | 'popular' | null;
  createdAt?: Date;
};

const PopularDestinations: React.FC = () => {
  const apartments = useQuery(api.functions.apartments.getApartmentsWithImages) as ApartmentData[] | null;
  const toggleFavoriteMutation = useMutation(api.functions.favorites.toggleFavorite);
  const [favoritedApartments, setFavoritedApartments] = useState<Id<"apartments">[]>([]);

  useEffect(() => {
    // Initiera favoriter om det behövs från den hämtade datan
    if (apartments) {
      const initialFavorites = apartments
        .filter(apartment => apartment.category === 'popular')
        .filter(apartment => favoritedApartments.includes(apartment._id))
        .map(apartment => apartment._id);

      setFavoritedApartments(initialFavorites);
    }
  }, [apartments]);

  const toggleFavorite = async (apartmentId: Id<"apartments">) => {
    try {
      await toggleFavoriteMutation({ apartmentId });
      setFavoritedApartments(prev =>
        prev.includes(apartmentId)
          ? prev.filter(id => id !== apartmentId) // Ta bort från favoriter
          : [...prev, apartmentId] // Lägg till i favoriter
      );
    } catch (error) {
      console.error("Misslyckades att toggla favorit", error);
    }
  };

  if (!apartments) {
    return <div>Laddar populära destinationer...</div>;
  }

  const popularApartments = apartments.filter(apartment => apartment.category === 'popular');

  return (
    <>
      <h3 className="flex justify-center text-[40px] font-[600] mb-[36px] mt-[40px]">Populära destinationer</h3>
      <div className="flex flex-wrap gap-[86px] justify-center mx-36">
        {popularApartments.map(apartment => (
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
            onToggleFavorite={() => toggleFavorite(apartment._id)}
          />
        ))}
      </div>
    </>
  );
};

export default PopularDestinations;
