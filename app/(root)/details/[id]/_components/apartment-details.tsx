// ApartmentDetails.tsx
'use client'

import HeaderWithoutSearch from '@/app/(root)/_components/header-without-search';
import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import ImageCarousel from '@/app/(root)/_components/image-carousel';
import BookingCard from './booking-card';

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
    rating?: number;
    amenities?: string[];
    hostName?: string;
};

const ApartmentDetails = (): JSX.Element => {
  const { id } = useParams();

  const apartment = useQuery(api.functions.apartments.getApartmentById, { _id: id as Id<"apartments"> }) as ApartmentData | null;

  if (!apartment) {
    return <div>Laddar lägenhetens information...</div>;
  }

  const findNthIndex = (str: string, char: string, n: number) => {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === char) {
        count++;
        if (count === n) {
          return i;
        }
      }
    }
    return -1;
  };

  const thirdPeriodIndex = findNthIndex(apartment.description, '.', 3);
  const descriptionPart1 = apartment.description.slice(0, thirdPeriodIndex + 1);
  const descriptionPart2 = apartment.description.slice(thirdPeriodIndex + 1).trim();

  return (
    <>
      <HeaderWithoutSearch />
      <div className="mt-10 px-4 md:px-10 lg:px-20 max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-0">{apartment.title}</h2>
          <div className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.9125 11L3.725 7.4875L1 5.125L4.6 4.8125L6 1.5L7.4 4.8125L11 5.125L8.275 7.4875L9.0875 11L6 9.1375L2.9125 11Z" fill="#1D1B20" />
            </svg>
            <p className='text-lg md:text-xl font-semibold'>{apartment.rating}</p>
          </div>
        </div>
        <div className="mb-6">
          <ImageCarousel images={apartment.images} size="large" />
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <p className="font-semibold text-lg">Din värd: {apartment.hostName ?? 'Okänd värd'}</p>
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <p>{apartment.bedrooms} sovrum</p>
              <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="2.5271" cy="2.5" r="2.5" fill="black" fillOpacity="0.8" />
              </svg>
              <p>{apartment.beds} sängar</p>
            </div>
            <p className="mb-5">{descriptionPart1}</p>
            <p>{descriptionPart2}</p>
            <div className="mt-10">
              <h3 className="font-semibold text-lg mb-2">Boendet erbjuder</h3>
              {apartment.amenities && apartment.amenities.length > 0 ? (
                <ul className="flex flex-wrap">
                  {apartment.amenities.map((amenity, index) => (
                    <li key={index} className='w-1/2 text-gray-600'>{amenity}</li>
                  ))}
                </ul>
              ) : (
                <p>Inga bekvämligheter tillgängliga</p>
              )}
            </div>
          </div>
          <div className="w-full lg:w-1/3">
            <BookingCard 
              pricePerNight={apartment.price} 
              title={apartment.title} 
              beds={apartment.beds} 
              bedrooms={apartment.bedrooms} 
              id={apartment._id}
              imageUrl={apartment.images[0]} 
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ApartmentDetails;
