'use client';

import React, { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import ApartmentImage from './apartment-image';
import { Id } from '@/convex/_generated/dataModel'; // Importera Id-typen

type ApartmentData = {
  _id: Id<"apartments">; // Convex-ID för varje lägenhet
  title: string;
  description: string;
  bedrooms: number;
  beds: number;
  price: number;
  images: string[]; // Array av bild-URL:er efter att ha hämtat från _storage
  country: string;
  city: string;
  category?: 'offer' | 'popular' | null; // Fält för att hantera kategorin
  createdAt?: Date;
};

const PopularDestinations = (): JSX.Element => {
  const apartments = useQuery(api.functions.apartments.getApartmentsWithImages) as ApartmentData[] | null;
  const [favoritedApartments, setFavoritedApartments] = useState<Id<"apartments">[]>([]); // Hantera Convex-ID för favoriter

  const popularApartments = apartments?.filter(apartment => apartment.category === 'popular');

  const toggleFavorite = (apartmentId: Id<"apartments">) => {
    setFavoritedApartments(prev =>
      prev.includes(apartmentId)
        ? prev.filter(id => id !== apartmentId)
        : [...prev, apartmentId]
    );
  };

  if (!popularApartments) {
    return <div>Laddar populära destinationer...</div>;
  }

  return (
    <>
      <h3 className="flex justify-center text-[40px] font-[600] mb-[36px] mt-[40px]">Populära destinationer</h3>
      <div className="flex flex-wrap gap-[86px] justify-center mx-36">
        {popularApartments.map(apartment => (
          <div key={apartment._id.toString()} className="p-2 rounded-lg mb-4">
            <div className="w-[200px] text-[12px]">
              {/* Bildkarusell för varje lägenhet */}
              <ApartmentImage
                apartmentId={apartment._id}
                images={apartment.images}
                isFavorited={favoritedApartments.includes(apartment._id)}
                onToggleFavorite={() => toggleFavorite(apartment._id)}
              />

              {/* Titel och rating */}
              <div className="flex justify-between font-semibold mt-2">
                <h3 className="">{apartment.title}</h3>
                <div className="flex items-center">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.9125 11L3.725 7.4875L1 5.125L4.6 4.8125L6 1.5L7.4 4.8125L11 5.125L8.275 7.4875L9.0875 11L6 9.1375L2.9125 11Z"
                      fill="#1D1B20"
                    />
                  </svg>
                  <p>4.8</p> {/* Här kan du lägga till dynamiskt rating om det finns */}
                </div>
              </div>

              {/* Sovrum och sängar */}
              <div className="flex items-center gap-2 text-gray-600">
                <p>{apartment.bedrooms} sovrum</p>
                <svg
                  width="6"
                  height="5"
                  viewBox="0 0 6 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="2.5271" cy="2.5" r="2.5" fill="black" fillOpacity="0.8" />
                </svg>
                <p>{apartment.beds} sängar</p>
              </div>

              {/* Pris */}
              <div className="pt-3">
                <p className="font-medium">{apartment.price} kr/natt</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PopularDestinations;