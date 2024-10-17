'use client';
import React from 'react';
import { useQuery } from 'convex/react'; // Importera useQuery från Convex
import { api } from '@/convex/_generated/api'; // Importera det genererade API:t

interface ApartmentData {
  titel: string;
  description: string;
  price: number;
  images: { id: string; src: string }[]; // Array av objekt med id och src
  country: string;
  city: string;
  bedrooms: number;
  beds: number;
}

const ApartmentList = (): JSX.Element => {
  // Använd Convex-query för att hämta lägenhetsdata
  const apartments = useQuery(api.functions.apartments.getApartments); // Detta är korrekt

  // Om datan inte har laddats ännu, visa en laddningsindikator
  if (!apartments) {
    return <div>Laddar lägenheter...</div>;
  }

  return (
    <div className="apartment-list-container">
      {/* Iterera över lägenheterna och visa dem */}
      {apartments.map((apartment: ApartmentData) => (
        <div key={apartment.titel} className="bg-red-200 w-[200px] h-[238px] text-[12px] p-2 rounded-lg mb-4">
          {/* Bilddel */}
          <div className="h-[160px] bg-red-300 rounded-[10px] overflow-hidden">
            {apartment.images && apartment.images.length > 0 ? (
              <img
                src={apartment.images[0].src} // Använd src från det första objektet i images-arrayen
                alt={apartment.titel}
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="text-center">Ingen bild tillgänglig</p>
            )}
          </div>

          {/* Titel och rating */}
          <div className="flex justify-between font-semibold mt-2">
            <h3>{apartment.titel}</h3>
            <div className='flex items-center'>
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.9125 11L3.725 7.4875L1 5.125L4.6 4.8125L6 1.5L7.4 4.8125L11 5.125L8.275 7.4875L9.0875 11L6 9.1375L2.9125 11Z" fill="#1D1B20"/>
</svg>
<p>4.8</p>
</div>

          </div>

         
          {/* Sovrum och sängar */}
          <div className="flex items-center gap-2 text-gray-600">
            <p>{apartment.bedrooms} sovrum</p>
            <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="2.5271" cy="2.5" r="2.5" fill="black" fillOpacity="0.8" />
            </svg>
            <p>{apartment.beds} sängar</p>
          </div>

          {/* Pris */}
          <div className="pt-3">
            <p className="font-medium">{apartment.price} kr/natt</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApartmentList;
