import { ApartmentData } from '@/types/types';
import React, { useState, useEffect } from 'react';


interface DestinationSearchProps {
  apartments: ApartmentData[];
  onFilter: (filtered: ApartmentData[]) => void;
}

const DestinationSearch: React.FC<DestinationSearchProps> = ({ apartments, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredApartments = apartments.filter(apartment =>
      apartment.country.toLowerCase().includes(lowerCaseSearchTerm) ||
      apartment.city.toLowerCase().includes(lowerCaseSearchTerm)
    );
    onFilter(filteredApartments);
  }, [searchTerm, apartments, onFilter]);

  return (
    <input
      type="text"
      placeholder="Sök destination"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="text-gray-500 pt-[10px] bg-transparent focus:outline-none"
    />
  );
};

export default DestinationSearch;
