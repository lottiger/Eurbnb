import React from 'react';
import { useGuestContext } from '@/context/guest-context';
import { PlusIcon } from './plus-icon';
import MinusIcon from './minus-icon';

interface GuestSelectorProps {
  onClose: () => void; // Prop för att stänga GuestSelector
}

const GuestSelector: React.FC<GuestSelectorProps> = ({ onClose }) => {
  const { adults, numChildren, infants, updateAdults, updateChildren, updateInfants, totalGuests } = useGuestContext();
  const maxGuests = 10;

  return (
    <div className='w-[330px] h-[220px] py-3 px-7'>
      {/* Vuxna */}
      <div className="flex items-center justify-between">
        <div className='pb-6'>
          <p className='pb-1'>Vuxna</p>
          <p className='text-[#71717A]'>13 år eller äldre</p>
        </div>
        <div className="flex items-center">
          <button type="button" onClick={() => updateAdults(adults > 0 ? adults - 1 : 0)}>
            <MinusIcon />
          </button>
          <span className='px-[22px]'>{adults}</span>
          <button
            type="button"
            onClick={() => totalGuests < maxGuests && updateAdults(adults + 1)}
            disabled={totalGuests >= maxGuests}
          >
            <PlusIcon />
          </button>
        </div>
      </div>

      {/* Barn */}
      <div className="flex items-center justify-between">
        <div className='pb-6'>
          <p className='pb-1'>Barn</p>
          <p className='text-[#71717A]'>2-12 år</p>
        </div>
        <div className="flex items-center">
          <button type="button" onClick={() => updateChildren(numChildren > 0 ? numChildren - 1 : 0)}>
            <MinusIcon />
          </button>
          <span className='px-[22px]'>{numChildren}</span>
          <button
            type="button"
            onClick={() => totalGuests < maxGuests && updateChildren(numChildren + 1)}
            disabled={totalGuests >= maxGuests}
          >
            <PlusIcon />
          </button>
        </div>
      </div>

      {/* Spädbarn */}
      <div className="flex items-center justify-between">
        <div className='pb-6'>
          <p className='pb-1'>Spädbarn</p>
          <p className='text-[#71717A]'>Under 2 år</p>
        </div>
        <div className="flex items-center">
          <button type="button" onClick={() => updateInfants(infants > 0 ? infants - 1 : 0)}>
            <MinusIcon />
          </button>
          <span className='px-[22px]'>{infants}</span>
          <button
            type="button"
            onClick={() => totalGuests < maxGuests && updateInfants(infants + 1)}
            disabled={totalGuests >= maxGuests}
          >
            <PlusIcon />
          </button>
        </div>
      </div>

      <button onClick={onClose} className="text-blue-500 mt-4">
        Stäng
      </button>
    </div>
  );
};

export default GuestSelector;
