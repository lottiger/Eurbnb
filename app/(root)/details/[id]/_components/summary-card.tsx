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

  // Format date for display
  const formattedCheckInDate = checkInDate
    ? new Date(checkInDate).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long' })
    : '';
  const formattedCheckOutDate = checkOutDate
    ? new Date(checkOutDate).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long' })
    : '';

  // Konvertera pris och antal nätter till nummer och räkna ut avgifter
  const parsedTotalPrice = totalPrice ? parseFloat(totalPrice) : 0;
  const cleaningFee = Math.round(parsedTotalPrice * 0.05); // 5% städavgift
  const serviceFee = Math.round(parsedTotalPrice * 0.10); // 10% serviceavgift
  const finalTotal = parsedTotalPrice + cleaningFee + serviceFee; // Totalt pris med avgifter

  return (
    <div className='flex justify-center mt-24'>
      <div className=''>
        <h1 className='font-semibold text-[40px] text-center mb-6'>Skicka bokningsförfrågan</h1>
        <div className='border rounded-lg border-gray-500 p-4 text-[12px] inline-flex justify-center'>
          {imageUrl && <img src={imageUrl} alt="Lägenhetsbild" className="w-[239px] h-[187px] object-cover rounded-lg" />}
          <div className='px-4'>
            <h2 className='font-semibold'>{title}</h2>
            <div className='flex items-center gap-2 text-gray-600'>
              <p>{bedrooms} sovrum</p>
              <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="2.5271" cy="2.5" r="2.5" fill="black" fillOpacity="0.8" />
              </svg>
              <p>{beds} sängar</p>
            </div>
            <div>
              <p>Datum</p>
              <p>{formattedCheckInDate} - {formattedCheckOutDate}</p>
              <p>{totalGuests} gäster</p>
            </div>
            <p>{pricePerNight} kr per natt</p>
            <p>Antal nätter: {nights}</p>
            <div className='my-2'>
              <p>Städavgift: {cleaningFee} kr</p>
              <p>EurBNB serviceavgift: {serviceFee} kr</p>
            </div>
            <p>Totalt: {finalTotal} kr</p> {/* Totalt pris inklusive avgifter */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
