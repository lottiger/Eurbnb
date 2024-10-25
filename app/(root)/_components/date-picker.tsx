
// date-picker.tsx

import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';

interface DatePickerProps {
  onSelectDates: (start: Date | null, end: Date | null) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onSelectDates }) => {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined);

  const handleDateChange = (range: DateRange | undefined) => {
    setSelectedRange(range);
    if (range?.from && range?.to) {
      onSelectDates(range.from, range.to);
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
          onSelectDates(null, null);
        }}
        className="mt-4 text-sm text-blue-500"
      >
        Återställ datum
      </button>
    </div>
  );
};

export default DatePicker;
