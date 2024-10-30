// date-context.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DateContextProps {
  checkInDate: string | null;
  checkOutDate: string | null;
  updateCheckInDate: (date: string | null) => void;
  updateCheckOutDate: (date: string | null) => void;
}

const DateContext = createContext<DateContextProps | undefined>(undefined);

export const DateProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [checkInDate, setCheckInDate] = useState<string | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<string | null>(null);

  const updateCheckInDate = (date: string | null) => setCheckInDate(date);
  const updateCheckOutDate = (date: string | null) => setCheckOutDate(date);

  return (
    <DateContext.Provider value={{ checkInDate, checkOutDate, updateCheckInDate, updateCheckOutDate }}>
      {children}
    </DateContext.Provider>
  );
};

export const useDateContext = (): DateContextProps => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error('useDateContext must be used within a DateProvider');
  }
  return context;
};
