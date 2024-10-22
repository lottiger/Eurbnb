'use client';

import React from 'react';
import { useQuery } from 'convex/react'; // Importera useQuery från Convex
import { api } from '@/convex/_generated/api'; // Importera det genererade API:t
import ImageCarousel from './image-carousel'; // Behåll din egna ImageCarousel
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // Importera Carousel från shadcn

// Typ för varje lägenhetsobjekt
type ApartmentData = {
  _id: string;
  title: string;
  description: string;
  bedrooms: number;
  beds: number;
  price: number;
  images: string[];
  country: string;
  city: string;
};

const ApartmentList = (): JSX.Element => {
  // Hämta lägenhetsdata via Convex-query
  const apartments = useQuery(api.functions.apartments.getApartmentsWithImages) as ApartmentData[] | null;

  // Om datan inte har laddats ännu, visa en laddningsindikator
  if (!apartments) {
    return <div>Laddar lägenheter...</div>;
  }

  return (
    <>
      <h2 className="flex justify-center text-[40px] font-[600] mb-[36px] mt-[40px]">Erbjudanden</h2>

      {/* Carousel från shadcn */}
      <div className="mx-40 mb-20 flex justify-center">
        <Carousel className=" max-w-[848px]">
          <CarouselContent>
            {apartments.map((apartment) => (
              <CarouselItem key={apartment._id} className="p-2 md:basis-1/2 lg:basis-1/3 flex justify-center">
                <div className="w-[200px] text-[12px]">
                  {/* Använd din befintliga ImageCarousel */}
                  <ImageCarousel images={apartment.images} />
                  
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
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Anpassade pilar för navigering */}
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <h3 className="flex justify-center text-[40px] font-[600] mb-[36px] mt-[40px]">Populära destinationer</h3>
      <div className="flex flex-wrap gap-[86px] justify-center mx-36">
        {apartments.map((apartment) => (
          <div key={apartment._id} className="p-2 rounded-lg mb-4">
            <div className="w-[200px] text-[12px]">
              {/* Bildkarusell för varje lägenhet */}
              <ImageCarousel images={apartment.images} />

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
          </div>
        ))}
      </div>
    </>
  );
};

export default ApartmentList;
