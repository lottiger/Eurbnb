import React, { useRef, useEffect, useState } from "react";
import GuestSelector from "./guest-selector";
import DatePicker from "./date-picker";
import DestinationSearch from "./destination-search";
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { ApartmentData } from "@/types/types";
import SearchButton from "./search-button";
import { useDateContext } from '@/context/date-context';
import { useGuestContext } from '@/context/guest-context';

interface SearchBarProps {
  onSearch: (destination: string, dates: string, guests: number) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { checkInDate, checkOutDate } = useDateContext(); // Använder DateContext
  const { guests } = useGuestContext(); // Använder GuestContext
  const [destination, setDestination] = useState('');
  const [isGuestSelectorVisible, setIsGuestSelectorVisible] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const allApartments = useQuery(api.functions.apartments.getApartmentsWithImages) as ApartmentData[] | null;

  const guestSelectorRef = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Stänger selektorer om man klickar utanför
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        guestSelectorRef.current && !guestSelectorRef.current.contains(target) &&
        datePickerRef.current && !datePickerRef.current.contains(target)
      ) {
        setIsGuestSelectorVisible(false);
        setIsDatePickerVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const dates = checkInDate && checkOutDate 
      ? `${new Date(checkInDate).toLocaleDateString("sv-SE", { day: "numeric", month: "short" })} - ${new Date(checkOutDate).toLocaleDateString("sv-SE", { day: "numeric", month: "short" })}` 
      : 'Lägg till datum';
    onSearch(destination, dates, guests);
  };

  return (
    <form onSubmit={handleSearch} className='shadow-md rounded-[50px] flex py-[11px] px-[34px] text-[14px] items-center'>
      <div className='border-r border-[#E4E4E7] px-[25px] relative'>
        <h2>Vart</h2>
        {allApartments && (
          <DestinationSearch
            apartments={allApartments}
            onSelect={(selectedDestination) => setDestination(selectedDestination)}
          />
        )}
      </div>
      <div className='border-r border-[#E4E4E7] px-[25px] relative' ref={datePickerRef}>
        <h2>När</h2>
        <p
          className="text-gray-500 pt-[10px] bg-transparent cursor-pointer"
          onClick={() => setIsDatePickerVisible(!isDatePickerVisible)}
        >
          {checkInDate && checkOutDate 
            ? `${new Date(checkInDate).toLocaleDateString("sv-SE", { day: "numeric", month: "short" })} - ${new Date(checkOutDate).toLocaleDateString("sv-SE", { day: "numeric", month: "short" })}` 
            : 'Lägg till datum'}
        </p>
        {isDatePickerVisible && (
          <div className="absolute top-[68px] -left-[155px] bg-white rounded shadow-md z-50">
            <DatePicker />
          </div>
        )}
      </div>
      <div className="relative px-[25px]" ref={guestSelectorRef}>
        <h2>Antal</h2>
        <p
          className="text-gray-500 pt-[10px] bg-transparent cursor-pointer"
          onClick={() => setIsGuestSelectorVisible(!isGuestSelectorVisible)}
        >
          {guests > 0 ? `${guests} gäst${guests > 1 ? 'er' : ''}` : 'Lägg till gäster'}
        </p>
        {isGuestSelectorVisible && (
          <div className="absolute top-[68px] -left-[155px] bg-white rounded shadow-md z-50">
            <GuestSelector onClose={() => setIsGuestSelectorVisible(false)} />
          </div>
        )}
      </div>
     <SearchButton />
    </form>
  );
};

export default SearchBar;
