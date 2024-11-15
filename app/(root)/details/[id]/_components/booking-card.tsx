import React, { useMemo, useState, useRef, useEffect } from 'react';
import { ArrowIcon } from './arrow-icon';
import { useGuestContext } from '@/context/guest-context';
import { useDateContext } from '@/context/date-context';
import DatePicker from '@/app/(root)/_components/date-picker';
import GuestSelector from '@/app/(root)/_components/guest-selector';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface BookingCardProps {
  pricePerNight: number;
  title: string;
  beds: number;
  bedrooms: number;
  id: string;
  imageUrl: string; 
  nights?: number;
}

const BookingCard: React.FC<BookingCardProps> = ({ pricePerNight, title, beds, bedrooms, id, imageUrl }) => {
  const { totalGuests } = useGuestContext();
  const { checkInDate, checkOutDate } = useDateContext();
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isGuestSelectorVisible, setIsGuestSelectorVisible] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const guestSelectorRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (datePickerRef.current && !datePickerRef.current.contains(target)) {
        setIsDatePickerVisible(false);
      }
      if (guestSelectorRef.current && !guestSelectorRef.current.contains(target)) {
        setIsGuestSelectorVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const nights = useMemo(() => {
    if (checkInDate && checkOutDate) {
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);
      return Math.max(0, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    }
    return 0;
  }, [checkInDate, checkOutDate]);

  const totalPrice = nights * pricePerNight;

  const handleReservation = (event: React.FormEvent) => {
    event.preventDefault();
  
    if (!checkInDate || !checkOutDate) {
      toast.error('Välj ett in- och utcheckningsdatum');
      return;
    }
    
    if (totalGuests === 0) {
      toast.error('Välj antal gäster');
      return;
    }

    router.push(`/details/${id}/summary?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&totalGuests=${totalGuests}&pricePerNight=${pricePerNight}&totalPrice=${totalPrice}&title=${title}&beds=${beds}&bedrooms=${bedrooms}&nights=${nights}&imageUrl=${encodeURIComponent(imageUrl)}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent, toggleFunction: () => void) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleFunction();
    }
  };

  return (
    <div className="w-[300px] h-[351px] shadow-md p-4 flex justify-center">
      <form onSubmit={handleReservation}>
        <div className="text-[12px] font-semibold mt-4">
          {/* Incheckning och Utcheckning */}
          <div className="flex">
            <div
              className="border w-[122px] px-2 py-1 rounded-t cursor-pointer"
              tabIndex={0}
              role="button"
              aria-label="Välj incheckningsdatum"
              onClick={() => setIsDatePickerVisible(!isDatePickerVisible)}
              onKeyDown={(event) => handleKeyDown(event, () => setIsDatePickerVisible(!isDatePickerVisible))}
            >
              <p>Incheckning</p>
              <p>{checkInDate ? new Date(checkInDate).toLocaleDateString('sv-SE') : 'Välj datum'}</p>
            </div>
            <div
              className="border-y border-r w-[122px] px-2 py-1 rounded-tr cursor-pointer"
              tabIndex={0}
              role="button"
              aria-label="Välj utcheckningsdatum"
              onClick={() => setIsDatePickerVisible(!isDatePickerVisible)}
              onKeyDown={(event) => handleKeyDown(event, () => setIsDatePickerVisible(!isDatePickerVisible))}
            >
              <p>Utcheckning</p>
              <p>{checkOutDate ? new Date(checkOutDate).toLocaleDateString('sv-SE') : 'Välj datum'}</p>
            </div>
          </div>
          {isDatePickerVisible && (
            <div
              ref={datePickerRef}
              className="absolute z-50 bg-white rounded shadow-md mt-2"
              style={{ right: '20px' }}
            >
              <DatePicker />
            </div>
          )}

          {/* Antal gäster */}
          <div
            className="flex justify-between border-x border-b w-[244px] py-1 px-2 rounded-b cursor-pointer"
            tabIndex={0}
            role="button"
            aria-label="Välj antal gäster"
            onClick={() => setIsGuestSelectorVisible(!isGuestSelectorVisible)}
            onKeyDown={(event) => handleKeyDown(event, () => setIsGuestSelectorVisible(!isGuestSelectorVisible))}
          >
            <div>
              <p>Antal</p>
              <p>{totalGuests > 0 ? `${totalGuests} gäster` : 'Välj antal'}</p>
            </div>
            <div className="flex items-center">
              <ArrowIcon />
            </div>
          </div>
          {isGuestSelectorVisible && (
            <div ref={guestSelectorRef} className="absolute z-50 bg-white rounded shadow-md mt-2">
              <GuestSelector onClose={() => setIsGuestSelectorVisible(false)} />
            </div>
          )}

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
              <button type="submit" className="mt-4 bg-[#1E3E62] text-white rounded-md py-3 px-20 text-[16px] hover:bg-[#2A4F7A]">
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
