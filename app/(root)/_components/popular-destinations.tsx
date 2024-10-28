'use client';

import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import ApartmentCard from './apartment-card';
import { Id } from '@/convex/_generated/dataModel';
import { useFavorites } from '@/context/favorites-context';


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
  const { favoritedApartments, toggleFavorite } = useFavorites();

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
