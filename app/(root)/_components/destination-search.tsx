import { ApartmentData } from '@/types/types';
import React, { useState, useEffect } from 'react';

interface DestinationSearchProps {
  apartments: ApartmentData[];
  onSelect: (selectedDestination: string) => void;
}

const DestinationSearch: React.FC<DestinationSearchProps> = ({ apartments, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<ApartmentData[]>([]);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredSuggestions = apartments.filter(apartment =>
      apartment.country.toLowerCase().includes(lowerCaseSearchTerm) ||
      apartment.city.toLowerCase().includes(lowerCaseSearchTerm)
    );

    setSuggestions(lowerCaseSearchTerm.length > 0 ? filteredSuggestions : []);
  }, [searchTerm, apartments]);

  const handleSelectSuggestion = (suggestion: ApartmentData) => {
    const selectedDestination = suggestion.city;
    setSearchTerm(selectedDestination); // Uppdaterar fältet
    setSuggestions([]); // Rensar förslagslistan för att stänga den
    onSelect(selectedDestination); // Anropar funktionen direkt med valt värde
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Sök destination"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="text-gray-500 pt-[10px] bg-transparent focus:outline-none"
      />
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-md z-10">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion._id.toString()}
              onClick={() => handleSelectSuggestion(suggestion)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {suggestion.city}, {suggestion.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DestinationSearch;
