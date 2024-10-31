'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';

const SummaryCard = (): JSX.Element => {
  const searchParams = useSearchParams();

  const title = searchParams.get('title');
  const checkInDate = searchParams.get('checkInDate');
  const checkOutDate = searchParams.get('checkOutDate');
  const totalGuests = searchParams.get('totalGuests');
  const pricePerNight = searchParams.get('pricePerNight');
  const nights = searchParams.get('nights');
  const totalPrice = searchParams.get('totalPrice');
  const beds = searchParams.get('beds');
  const bedrooms = searchParams.get('bedrooms');
  const imageUrl = decodeURIComponent(searchParams.get('imageUrl') || '');

  return (
    <div className='flex justify-center mt-24'>
    <div className=''>
      <h1 className='font-semibold text-[40px] text-center mb-6'>Skicka bokningsförfrågan</h1>
      <div className='border rounded-lg border-gray-500 p-4 text-[12px] inline-flex justify-center'>
      {imageUrl && <img src={imageUrl} alt="Lägenhetsbild" className=" w-[239] h-[187px] object-cover rounded-lg" />}
      <div className='px-4'>
      <h2 className='font-semibold'>{title}</h2>
      <div className='flex'>
      <p>{bedrooms} sovrum</p>
      <p>{beds} sängar</p>
      </div>
      <p>Datum: {checkInDate} - {checkOutDate}</p>
      <p>{totalGuests} gäster</p>
      <p>{pricePerNight} kr per natt</p>
      <p>Antal nätter: {nights}</p>
      <p>Totalt: {totalPrice} kr</p>
      </div>
      </div>
    </div>
    </div>
  );
};

export default SummaryCard;
