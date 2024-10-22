'use client';
import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Slider from 'react-slick';
import ImageCarousel from './image-carousel';

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

// Anpassad vänsterpil (föregående)
const PrevArrow = (props: any) => {
  const { onClick, style } = props;
  return (
    <button
      onClick={onClick}
      style={{
        ...style,
        display: 'block',
        background: 'transparent',
        border: 'none',
        position: 'absolute',
        left: '-35px', // Flyttar in pilen från vänster
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1, // Se till att pilen visas över korten
      }}
    >
      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15.8333 10.0001H4.16663M4.16663 10.0001L9.99996 15.8334M4.16663 10.0001L9.99996 4.16675"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

// Anpassad högerpil (nästa)
const NextArrow = (props: any) => {
  const { onClick, style } = props;
  return (
    <button
      onClick={onClick}
      style={{
        ...style,
        display: 'block',
        background: 'transparent',
        border: 'none',
        position: 'absolute',
        right: '-35px', // Flyttar in pilen från höger
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1, // Se till att pilen visas över korten
      }}
    >
      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4.16663 10.0001H15.8333M15.8333 10.0001L9.99996 4.16675M15.8333 10.0001L9.99996 15.8334"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

const ApartmentList = (): JSX.Element => {
  // Använd Convex-query för att hämta lägenhetsdata
  const apartments = useQuery(api.functions.apartments.getApartmentsWithImages) as ApartmentData[] | null;

  // Om datan inte har laddats ännu, visa en laddningsindikator
  if (!apartments) {
    return <div>Laddar lägenheter...</div>;
  }

  // Karusellinställningar med anpassade pilar
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  
  };

  return (
    <>
      <h2 className="flex justify-center text-[40px] font-[600] mb-[36px] mt-[40px]">Erbjudanden</h2>

      <div className="relative mx-56 mb-20">
        <Slider {...settings} className="relative px-10"> {/* Lägg till padding här för pilarna */}
          {apartments.map((apartment) => (
            <div key={apartment._id} className="p-2 rounded-lg mb-4">
              <div className="w-[200px] text-[12px] ">
                <ImageCarousel images={apartment.images} />
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
                <div className="flex items-center gap-2 text-gray-600">
                  <p>{apartment.bedrooms} sovrum</p>
                  <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="2.5271" cy="2.5" r="2.5" fill="black" fillOpacity="0.8" />
                  </svg>
                  <p>{apartment.beds} sängar</p>
                </div>
                <div className="pt-3">
                  <p className="font-medium">{apartment.price} kr/natt</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <h3 className="flex justify-center text-[40px] font-[600] mb-[36px] mt-[40px]">Populära destinationer</h3>
      <div className='flex flex-wrap gap-[86px] justify-center mx-36'>
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
