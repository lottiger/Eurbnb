'use client'

import HeaderWithoutSearch from '@/app/(root)/_components/header-without-search';
import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
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
    rating?: number;
    amenities?: string[];
    hostName?: string;
};

const ApartmentDetails = (): JSX.Element => {
  const { id } = useParams(); // Hämta id från URL som string

  // Använd useQuery för att hämta lägenhetsdata dynamiskt
  const apartment = useQuery(api.functions.apartments.getApartmentById, { _id: id as Id<"apartments"> }) as ApartmentData | null;

  if (!apartment) {
    return <div>Laddar lägenhetens information...</div>;
  }

  return (
    <>
      <HeaderWithoutSearch />
      <div className="p-4 max-w-2xl mx-auto">
        <div className='flex justify-between items-center'>
        <h2 className="text-[40px] font-semibold mb-2">{apartment.title}</h2>
        <div className="flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.9125 11L3.725 7.4875L1 5.125L4.6 4.8125L6 1.5L7.4 4.8125L11 5.125L8.275 7.4875L9.0875 11L6 9.1375L2.9125 11Z" fill="#1D1B20" />
          </svg>
          <p className='text-[20px] font-semibold'>{apartment.rating}</p>
        </div>
        </div>
        <div className="mb-6">
          {apartment.images && apartment.images.length > 0 ? (
            <img src={apartment.images[0]} alt={apartment.title} className="w-full rounded-md" />
          ) : (
            <p>Inga bilder tillgängliga</p>
          )}
        </div>

        <div className="mb-4">
          <p className="font-semibold">Värd: {apartment.hostName ?? 'Okänd värd'}</p>
          <div className="flex space-x-4 mt-2">
            <p>{apartment.bedrooms} sovrum</p>
            <p>{apartment.beds} sängar</p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Beskrivning</h3>
          <p>{apartment.description}</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Bekvämligheter</h3>
          {apartment.amenities && apartment.amenities.length > 0 ? (
            <ul className="list-disc ml-5">
              {apartment.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          ) : (
            <p>Inga bekvämligheter tillgängliga</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ApartmentDetails;
