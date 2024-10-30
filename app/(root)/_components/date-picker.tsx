import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { useDateContext } from '@/context/date-context'; // Importera DateContext

const DatePicker: React.FC = () => {
  const { checkInDate, checkOutDate, updateCheckInDate, updateCheckOutDate } = useDateContext();
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined);

  // Uppdatera valt datumintervall när checkInDate eller checkOutDate ändras
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      setSelectedRange({ from: new Date(checkInDate), to: new Date(checkOutDate) });
    } else {
      setSelectedRange(undefined);
    }
  }, [checkInDate, checkOutDate]);

  // Hantera datumval och uppdatera kontext
  const handleDateChange = (range: DateRange | undefined) => {
    setSelectedRange(range);
    if (range?.from && range?.to) {
      updateCheckInDate(range.from.toISOString());
      updateCheckOutDate(range.to.toISOString());
    } else {
      updateCheckInDate(null);
      updateCheckOutDate(null);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <Calendar
        mode="range"
        selected={selectedRange}
        onSelect={handleDateChange}
        numberOfMonths={2}
      />
      <button
        onClick={() => {
          setSelectedRange(undefined);
          updateCheckInDate(null);
          updateCheckOutDate(null);
        }}
        className="mt-4 text-sm text-blue-500"
      >
        Återställ datum
      </button>
    </div>
  );
};

export default DatePicker;
