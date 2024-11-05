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
    <div className="flex justify-center mt-12 px-4 md:px-0">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-2xl">
        <h1 className="font-semibold text-[40px] text-center mb-6">Skicka bokningsförfrågan</h1>
        <div className="border rounded-lg border-gray-500 p-4 flex flex-col md:flex-row text-[12px] justify-center">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Lägenhetsbild"
              className="w-full md:w-[239px] h-[187px] object-cover rounded-lg mb-4 md:mb-0"
            />
          )}
          <div className="px-4 flex-1">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">{title}</h2>
              <p className="text-gray-700">{totalGuests} gäster</p>
            </div>
            <div className="flex items-center gap-2 text-gray-600 my-2">
              <p>{bedrooms} sovrum</p>
              <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="2.5271" cy="2.5" r="2.5" fill="black" fillOpacity="0.8" />
              </svg>
              <p>{beds} sängar</p>
            </div>
            <div>
              <p className="font-medium pt-2">Datum</p>
              <p>
                {formattedCheckInDate} - {formattedCheckOutDate}
              </p>
            </div>
            <div className="my-4">
              <div className="flex justify-between pb-2">
                <p className="underline">Städavgift:</p>
                <p>{cleaningFee} kr</p>
              </div>
              <div className="flex justify-between">
                <p className="underline">EurBNB serviceavgift:</p>
                <p>{serviceFee} kr</p>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-1">
                <p>{pricePerNight} kr</p>
                <p>x {nights} nätter inklusive avgifter</p>
              </div>
              <p className="font-semibold">{finalTotal} kr</p> {/* Totalt pris inklusive avgifter */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
