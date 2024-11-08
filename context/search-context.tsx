import React, { createContext, useState, useContext } from 'react';

interface SearchContextType {
  dates: string | null;
  numberOfGuests: number;
  setSearchData: (dates: string | null, numberOfGuests: number) => void;
  resetSearchData: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dates, setDates] = useState<string | null>(null);
  const [numberOfGuests, setNumberOfGuests] = useState<number>(0);

  const setSearchData = (dates: string | null, numberOfGuests: number) => {
    setDates(dates);
    setNumberOfGuests(numberOfGuests);
  };

  const resetSearchData = () => {
    setDates(null);
    setNumberOfGuests(0);
  };

  return (
    <SearchContext.Provider value={{ dates, numberOfGuests, setSearchData, resetSearchData }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};