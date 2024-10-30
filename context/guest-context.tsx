// guest-context.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GuestContextProps {
  guests: number;
  updateGuests: (guests: number) => void;
}

const GuestContext = createContext<GuestContextProps | undefined>(undefined);

export const GuestProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [guests, setGuests] = useState<number>(0);

  const updateGuests = (newGuests: number) => setGuests(newGuests);

  return (
    <GuestContext.Provider value={{ guests, updateGuests }}>
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
