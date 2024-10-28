'use client';

import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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

const Offers = (): JSX.Element => {
  const apartments = useQuery(api.functions.apartments.getApartmentsWithImages) as ApartmentData[] | null;
  const { favoritedApartments, toggleFavorite } = useFavorites();

  const offerApartments = apartments?.filter(apartment => apartment.category === "offer");

  if (!offerApartments) {
    return <div>Laddar erbjudanden...</div>;
  }

  return (
    <>
      <h2 className="flex justify-center text-[40px] font-[600] mb-[36px] mt-[40px]">Erbjudanden</h2>
      <div className="mx-40 mb-20 flex justify-center">
        <Carousel className="max-w-[848px]">
          <CarouselContent>
            {offerApartments.map(apartment => (
              <CarouselItem key={apartment._id.toString()} className="p-2 md:basis-1/2 lg:basis-1/3 flex justify-center">
                <ApartmentCard
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
};

export default Offers;
