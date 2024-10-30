import React, { useMemo, useState, useRef, useEffect } from 'react';
import { ArrowIcon } from './arrow-icon';
import { useGuestContext } from '@/context/guest-context';
import { useDateContext } from '@/context/date-context';
import DatePicker from '@/app/(root)/_components/date-picker';


interface BookingCardProps {
  pricePerNight: number;
}

const BookingCard: React.FC<BookingCardProps> = ({ pricePerNight }) => {
  const { guests } = useGuestContext();
  const { checkInDate, checkOutDate } = useDateContext();
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsDatePickerVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Beräkna antal nätter mellan incheckning och utcheckning
  const nights = useMemo(() => {
    if (checkInDate && checkOutDate) {
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);
      return Math.max(0, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    }
    return 0;
  }, [checkInDate, checkOutDate]);

  const totalPrice = nights * pricePerNight;

  return (
    <div className="w-[300px] h-[351px] shadow-md p-4 ml-10 flex justify-center">
      <form>
        <div className="text-[12px] font-semibold mt-4">
          <div className="flex" onClick={() => setIsDatePickerVisible(!isDatePickerVisible)}>
            <div className="border w-[122px] px-2 py-1 rounded-tl cursor-pointer">
              <p>Incheckning</p>
              <p>{checkInDate ? new Date(checkInDate).toLocaleDateString('sv-SE') : 'Välj datum'}</p>
            </div>
            <div className="border-y border-r w-[122px] px-2 py-1 rounded-tr cursor-pointer">
              <p>Utcheckning</p>
              <p>{checkOutDate ? new Date(checkOutDate).toLocaleDateString('sv-SE') : 'Välj datum'}</p>
            </div>
          </div>
          {isDatePickerVisible && (
            <div ref={datePickerRef} className="absolute z-50 bg-white rounded shadow-md mt-2">
              <DatePicker />
            </div>
          )}
          <div className="flex justify-between border-x border-b w-[244px] py-1 px-2 rounded-b">
            <div>
              <p>Antal</p>
              <p>{guests > 0 ? `${guests} gäster` : 'Välj antal'}</p>
            </div>
            <div className="flex items-center">
              <ArrowIcon />
            </div>
          </div>
          <div className="flex justify-center items-center flex-col text-center">
            <div className="font-normal text-gray-500 mt-4">
              <p>{nights} {nights === 1 ? 'dygn' : 'dygn'}</p>
              <p>{pricePerNight} kr per natt</p>
            </div>
            <div>
              <input
                className="w-[229px] h-[35px] border border-gray-300 rounded mt-4 font-normal text-center"
                type="text"
                placeholder="Lägg till rabattkod"
              />
              <p className="mt-4">Totalt: {totalPrice} kr</p>
              <p className="text-[11px] font-normal text-gray-500">inklusive skatter och avgifter</p>
              <button className="mt-4 bg-[#1E3E62] text-white rounded-md py-3 px-20 text-[16px]">
                Reservera
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingCard;
