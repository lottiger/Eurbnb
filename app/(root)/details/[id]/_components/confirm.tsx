'use client';
import React, { useEffect } from 'react';
import CheckIcon from './check-icon';
import HeaderWithoutSearch from '@/app/(root)/_components/header-without-search';
import { useRouter } from 'next/navigation';
import { useSearchContext } from '@/context/search-context';


const Confirm = (): JSX.Element => {
  const router = useRouter();
  const { resetSearchData } = useSearchContext(); // Hämta reset-funktionen

  useEffect(() => {
    resetSearchData(); // Töm datum och antal när komponenten mountas
  }, [resetSearchData]);

  const handleHomeClick = () => {
    router.push('/');
  };

  const handleBookingClick = () => {
    router.push('/bookings');
  };

  return (
    <>
      <HeaderWithoutSearch />
      <div className="flex justify-center items-center min-h-screen flex-col px-4">
        <div className="shadow-md p-8 md:px-16 lg:px-24 max-w-lg md:max-w-2xl text-center">
          <div className="flex flex-col justify-center items-center">
            <CheckIcon />
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold my-4">Din bokning genomfördes</h1>
            <p className="text-lg md:text-xl mb-10 text-gray-700">Bekräftelsen skickas till din e-post</p>
          </div>
        </div>
        <div className="my-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleHomeClick}
            className="w-full sm:w-auto bg-[#1E3E62] text-white rounded-md py-3 px-8 text-sm md:text-base hover:bg-[#2A4F7A] transition duration-300"
          >
            Tillbaka till startsidan
          </button>
          <button
            onClick={handleBookingClick}
            className="w-full sm:w-auto bg-[#1E3E62] text-white rounded-md py-3 px-8 text-sm md:text-base hover:bg-[#2A4F7A] transition duration-300"
          >
            Mina bokningar
          </button>
        </div>
      </div>
    </>
  );
};

export default Confirm;