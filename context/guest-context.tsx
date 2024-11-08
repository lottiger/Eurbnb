import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GuestContextProps {
  adults: number;
  numChildren: number;
  infants: number;
  totalGuests: number;
  updateAdults: (adults: number) => void;
  updateChildren: (numChildren: number) => void;
  updateInfants: (infants: number) => void;
  resetGuests: () => void; // Lägg till resetGuests till gränssnittet
}

const GuestContext = createContext<GuestContextProps | undefined>(undefined);

export const GuestProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [adults, setAdults] = useState<number>(0);
  const [numChildren, setChildren] = useState<number>(0);
  const [infants, setInfants] = useState<number>(0);

  const updateAdults = (newAdults: number) => setAdults(newAdults);
  const updateChildren = (newChildren: number) => setChildren(newChildren);
  const updateInfants = (newInfants: number) => setInfants(newInfants);

  const resetGuests = () => {
    setAdults(0);
    setChildren(0);
    setInfants(0);
  };

  const totalGuests = adults + numChildren + infants;

  return (
    <GuestContext.Provider value={{ adults, numChildren, infants, totalGuests, updateAdults, updateChildren, updateInfants, resetGuests }}>
      {children}
    </GuestContext.Provider>
  );
};

export const useGuestContext = (): GuestContextProps => {
  const context = useContext(GuestContext);
  if (!context) {
    throw new Error('useGuestContext must be used within a GuestProvider');
  }
  return context;
};