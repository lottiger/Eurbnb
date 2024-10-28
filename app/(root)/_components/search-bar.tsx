// SearchBar.tsx
import React, { useState, useRef, useEffect } from "react";
import GuestSelector from "./guest-selector";
import DatePicker from "./date-picker";
import DestinationSearch from "./destination-search";
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { ApartmentData } from "@/types/types";

interface SearchBarProps {
  onSearch: (destination: string, dates: string, guests: number) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [destination, setDestination] = useState(''); 
  const [dates, setDates] = useState<string>(''); 
  const [guests, setGuests] = useState(0);
  const [isGuestSelectorVisible, setIsGuestSelectorVisible] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const allApartments = useQuery(api.functions.apartments.getApartmentsWithImages) as ApartmentData[] | null;

  const guestSelectorRef = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);

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

  const handleSearch = () => {
    onSearch(destination, dates, guests);
  };

  const handleGuestUpdate = (adults: number, children: number, infants: number) => {
    setGuests(adults + children + infants);
  };

  const handleDateSelect = (start: Date | null, end: Date | null) => {
    if (start && end) {
      setDates(`${start.toLocaleDateString("sv-SE", { day: "numeric", month: "short" })} - ${end.toLocaleDateString("sv-SE", { day: "numeric", month: "short" })}`);
    } else {
      setDates('');
    }
    setIsDatePickerVisible(false);
  };

  return (
    <div className='shadow-md rounded-[50px] flex py-[11px] px-[34px] text-[14px] items-center'>
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
          {dates || 'Lägg till datum'}
        </p>
        {isDatePickerVisible && (
          <div className="absolute top-[68px] -left-[155px] bg-white rounded shadow-md z-50">
            <DatePicker onSelectDates={handleDateSelect} />
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
            <GuestSelector onGuestUpdate={handleGuestUpdate} onClose={() => setIsGuestSelectorVisible(false)} />
          </div>
        )}
      </div>
      <div className="pl-[25px] hover:cursor-pointer" onClick={handleSearch}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M28.0001 26.586L20.4481 19.034C22.2629 16.8553 23.1679 14.0608 22.9748 11.2319C22.7817 8.40296 21.5054 5.75738 19.4114 3.84551C17.3173 1.93363 14.5669 0.902668 11.7321 0.96708C8.89729 1.03149 6.19647 2.18632 4.19146 4.19133C2.18644 6.19635 1.03161 8.89717 0.967202 11.732C0.90279 14.5667 1.93376 17.3172 3.84563 19.4112C5.75751 21.5052 8.40309 22.7816 11.232 22.9747C14.061 23.1678 16.8554 22.2628 19.0341 20.448L26.5861 28L28.0001 26.586ZM3.00012 12C3.00012 10.22 3.52796 8.4799 4.51689 6.99986C5.50582 5.51982 6.91143 4.36627 8.55596 3.68508C10.2005 3.00389 12.0101 2.82566 13.7559 3.17293C15.5018 3.52019 17.1054 4.37736 18.3641 5.63603C19.6227 6.89471 20.4799 8.49835 20.8272 10.2442C21.1745 11.99 20.9962 13.7996 20.315 15.4441C19.6338 17.0887 18.4803 18.4943 17.0002 19.4832C15.5202 20.4722 13.7801 21 12.0001 21C9.61398 20.9973 7.32633 20.0483 5.63908 18.361C3.95182 16.6738 3.00276 14.3861 3.00012 12Z" fill="black" />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;
