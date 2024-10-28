// DestinationSearch.tsx
import React, { useState, useEffect } from 'react';
import { ApartmentData } from '@/types/types';

interface DestinationSearchProps {
  apartments: ApartmentData[];
  onSelect: (selectedDestination: string) => void;
}

const DestinationSearch: React.FC<DestinationSearchProps> = ({ apartments, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filtrera lägenheter baserat på sökterm
  const filteredSuggestions = apartments.filter(apartment =>
    apartment.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apartment.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Hantera ändring av sökterm
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setShowSuggestions(event.target.value.length > 0); // Visa förslag om söktermen inte är tom
  };

  // När ett förslag klickas
  const handleSelect = (destination: string) => {
    setSearchTerm(destination); // Uppdatera söktermen i fältet
    onSelect(destination); // Skicka valt värde uppåt till SearchBar
    setShowSuggestions(false); // Stäng förslagslistan
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Sök destination"
        value={searchTerm}
        onChange={handleChange}
        className="text-gray-500 pt-[10px] bg-transparent focus:outline-none"
      />
      {showSuggestions && (
        <ul className="absolute top-full left-0 right-0 bg-white border rounded shadow-lg z-10">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((apartment, index) => (
              <li
                key={index}
                onClick={() => handleSelect(apartment.city)} // Välj stad för enkelhet
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                {apartment.city}, {apartment.country}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">Ingen match</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default DestinationSearch;
