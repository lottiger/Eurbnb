import React, { useState } from 'react';
import { ApartmentData } from '@/types/types';

interface DestinationSearchProps {
  apartments: ApartmentData[];
  onSelect: (selectedDestination: string) => void;
}

const DestinationSearch: React.FC<DestinationSearchProps> = ({ apartments, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Skapa en Map för att filtrera unika städer och länder baserat på sökterm
  const filteredSuggestionsMap = new Map();
  apartments.forEach((apartment) => {
    const city = apartment.city.toLowerCase();
    const country = apartment.country.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();

    if (city.includes(searchTermLower)) {
      // Lägg till staden som nyckel om söktermen matchar staden
      filteredSuggestionsMap.set(`${city}-city`, { city: apartment.city, country: apartment.country });
    } else if (country.includes(searchTermLower)) {
      // Lägg till landet som nyckel om söktermen matchar landet, och staden inte matchar direkt
      filteredSuggestionsMap.set(`${country}-country`, { city: apartment.city, country: apartment.country });
    }
  });

  // Omvandla Map till en array av unika kombinationer av stad och land
  const filteredSuggestions = Array.from(filteredSuggestionsMap.values());

  // Skapa en lista över unika länder som matchar sökordet
  const uniqueCountries = Array.from(new Set(
    apartments
      .filter(apartment => apartment.country.toLowerCase().includes(searchTerm.toLowerCase()))
      .map(apartment => apartment.country)
  ));

  // Hantera ändring av sökterm
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setShowSuggestions(event.target.value.length > 0); // Visa förslag om söktermen inte är tom
  };

  // När ett förslag klickas
  const handleSelect = (destination: string, isCountry: boolean = false) => {
    setSearchTerm(destination); // Uppdatera söktermen i fältet
    onSelect(destination); // Skicka valt värde uppåt till SearchBar
    setShowSuggestions(false); // Stäng förslagslistan

    if (isCountry) {
      // Visa alla lägenheter i landet
      const apartmentsInCountry = apartments.filter(
        apartment => apartment.country.toLowerCase() === destination.toLowerCase()
      );
      console.log("Lägenheter i landet:", apartmentsInCountry);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Sök destination "
        value={searchTerm}
        onChange={handleChange}
        className="text-gray-500 pt-[10px] bg-transparent focus:outline-none w-32"
      />
      {showSuggestions && (
        <ul className="absolute top-full left-0 right-0 bg-white border rounded shadow-lg z-10">
          {uniqueCountries.map((country, index) => (
            <li
              key={`country-${index}`}
              onClick={() => handleSelect(country, true)} // Välj land
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 font-semibold"
            >
              {country}
            </li>
          ))}
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map(({ city, country }, index) => (
              <li
                key={`city-${index}`}
                onClick={() => handleSelect(city)} // Välj stad
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                {city}, {country}
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
