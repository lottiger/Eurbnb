import React, { useRef, useEffect, useState } from "react";
import GuestSelector from "./guest-selector";
import DatePicker from "./date-picker";
import DestinationSearch from "./destination-search";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ApartmentData } from "@/types/types";
import SearchButton from "./search-button";
import { useDateContext } from "@/context/date-context";
import { useGuestContext } from "@/context/guest-context";

interface SearchBarProps {
  onSearch: (destination: string, dates: string, guests: number) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { checkInDate, checkOutDate } = useDateContext();
  const { totalGuests } = useGuestContext();
  const [destination, setDestination] = useState("");
  const [isGuestSelectorVisible, setIsGuestSelectorVisible] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const allApartments = useQuery(api.functions.apartments.getApartmentsWithImages) as ApartmentData[] | null;

  const guestSelectorRef = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Hantera klick utanför komponenter
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        datePickerRef.current && !datePickerRef.current.contains(target) &&
        guestSelectorRef.current && !guestSelectorRef.current.contains(target)
      ) {
        setIsGuestSelectorVisible(false);
        setIsDatePickerVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const dates = checkInDate && checkOutDate 
      ? `${new Date(checkInDate).toLocaleDateString("sv-SE", { day: "numeric", month: "short" })} - ${new Date(checkOutDate).toLocaleDateString("sv-SE", { day: "numeric", month: "short" })}` 
      : "Lägg till datum";
    onSearch(destination, dates, totalGuests);
  };

  const handleKeyDown = (event: React.KeyboardEvent, toggleFunction: () => void) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleFunction();
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col border smx:flex-row py-[11px] px-[34px] text-[14px] items-center shadow-md rounded-[50px]"
    >
      {/* Destination */}
      <div className="px-[25px] smx:border-r border-[#E4E4E7] relative min-w-[150px]">
        <h2>Vart</h2>
        {allApartments && (
          <DestinationSearch
            apartments={allApartments}
            onSelect={(selectedDestination) => setDestination(selectedDestination)}
          />
        )}
      </div>

      {/* Date Picker */}
      <div className="pt-2 smx:border-r border-[#E4E4E7] px-[25px] relative min-w-[150px]">
        <h2>När</h2>
        <div
          className="text-gray-600 pt-[10px] cursor-pointer min-w-[120px] focus:outline-none"
          tabIndex={0}
          role="button"
          aria-label="Välj datum"
          onClick={() => setIsDatePickerVisible(!isDatePickerVisible)}
          onKeyDown={(event) => handleKeyDown(event, () => setIsDatePickerVisible(!isDatePickerVisible))}
        >
          {checkInDate && checkOutDate
            ? `${new Date(checkInDate).toLocaleDateString("sv-SE", { day: "numeric", month: "short" })} - ${new Date(checkOutDate).toLocaleDateString("sv-SE", { day: "numeric", month: "short" })}`
            : "Lägg till datum"}
        </div>
        {isDatePickerVisible && (
          <div ref={datePickerRef} className="absolute z-50 bg-white rounded shadow-md mt-2">
            <DatePicker />
          </div>
        )}
      </div>

      {/* Guest Selector */}
      <div className="pt-2 smx:relative px-[25px] min-w-[150px]">
        <h2>Antal</h2>
        <div
          className="text-gray-600 pt-[10px] cursor-pointer min-w-[120px] focus:outline-none"
          tabIndex={0}
          role="button"
          aria-label="Välj antal gäster"
          onClick={() => setIsGuestSelectorVisible(!isGuestSelectorVisible)}
          onKeyDown={(event) => handleKeyDown(event, () => setIsGuestSelectorVisible(!isGuestSelectorVisible))}
        >
          {totalGuests > 0 ? `${totalGuests} gäster` : "Lägg till gäster"}
        </div>
        {isGuestSelectorVisible && (
          <div ref={guestSelectorRef} className="absolute z-50 bg-white rounded shadow-md mt-2">
            <GuestSelector onClose={() => setIsGuestSelectorVisible(false)} />
          </div>
        )}
      </div>

      <div className="mt-2">
        <SearchButton />
      </div>
    </form>
  );
};

export default SearchBar;
