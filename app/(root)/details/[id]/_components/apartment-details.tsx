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
  const { id } = useParams(); // Hämta id från URL som string

  // Använd useQuery för att hämta lägenhetsdata dynamiskt
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
      <div className=" mt-10 mx-[185px]">
        <div className='flex justify-between items-center'>
          <h2 className="text-[40px] font-semibold mb-2">{apartment.title}</h2>
          <div className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.9125 11L3.725 7.4875L1 5.125L4.6 4.8125L6 1.5L7.4 4.8125L11 5.125L8.275 7.4875L9.0875 11L6 9.1375L2.9125 11Z" fill="#1D1B20" />
            </svg>
            <p className='text-[20px] font-semibold'>{apartment.rating}</p>
          </div>
        </div>
        <div className="">
          <ImageCarousel images={apartment.images} size="large" />
        </div>
        <div className="mt-5">
          <p className="font-semibold text-[16px]">Din värd: {apartment.hostName ?? 'Okänd värd'}</p>
          <div className="flex items-center gap-2 text-gray-600">
            <p>{apartment.bedrooms} sovrum</p>
            <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="2.5271" cy="2.5" r="2.5" fill="black" fillOpacity="0.8" />
            </svg>
            <p>{apartment.beds} sängar</p>
          </div>
        </div>
        <div className="flex mt-10">
          <div className="w-[556px]">
            <p className='mb-5'>{descriptionPart1}</p>
            <p>{descriptionPart2}</p>
            <div className="mt-20">
              <h3 className="font-semibold text-[16px] mt-5 mb-2">Boendet erbjuder</h3>
              {apartment.amenities && apartment.amenities.length > 0 ? (
                <ul className="flex flex-wrap">
                  {apartment.amenities.map((amenity, index) => (
                    <li key={index} className='w-1/2'>{amenity}</li>
                  ))} 
                </ul>
              ) : (
                <p>Inga bekvämligheter tillgängliga</p>
              )}
            </div>
          </div>
          <BookingCard />
        </div>
      </div>
    </>
  );
};

export default ApartmentDetails;