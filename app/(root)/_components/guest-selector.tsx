import React, { useState, useEffect } from 'react';
import { useGuestContext } from '@/context/guest-context';
import { PlusIcon } from './plus-icon';
import MinusIcon from './minus-icon';

interface GuestSelectorProps {
  onClose: () => void; // Prop för att stänga GuestSelector
}

const GuestSelector: React.FC<GuestSelectorProps> = ({ onClose }) => {
  const { guests, updateGuests } = useGuestContext();
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const maxGuests = 10; // Max antal gäster totalt

  // Uppdaterar totalantalet gäster i kontext när vuxna, barn eller spädbarn ändras
  useEffect(() => {
    const totalGuests = adults + children + infants;
    updateGuests(totalGuests);
  }, [adults, children, infants, updateGuests]);

  // Totalt antal gäster för att kontrollera maxgränsen
  const totalGuests = adults + children + infants;

  return (
    <div className='w-[330px] h-[220px] py-3 px-7'>
      <div className="flex items-center justify-between">
        <div className='pb-6'>
          <p className='pb-1'>Vuxna</p>
          <p className='text-[#71717A]'>13 år eller äldre</p>
        </div>
        <div className="flex items-center">
          <button 
            onClick={() => { setAdults(adults > 0 ? adults - 1 : 0); }}
          >
            <MinusIcon />
          </button>
          <span className='px-[22px]'>{adults}</span>
          <button 
            onClick={() => { if (totalGuests < maxGuests) setAdults(adults + 1); }}
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
          <button 
            onClick={() => { setChildren(children > 0 ? children - 1 : 0); }} 
            disabled={children <= 0}
          >
            <MinusIcon />
          </button>
          <span className='px-[22px]'>{children}</span>
          <button 
            onClick={() => { if (totalGuests < maxGuests) setChildren(children + 1); }}
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
          <button 
            onClick={() => { setInfants(infants > 0 ? infants - 1 : 0); }} 
            disabled={infants <= 0}
          >
           <MinusIcon />
          </button>
          <span className='px-[22px]'>{infants}</span>
          <button 
            onClick={() => { if (totalGuests < maxGuests) setInfants(infants + 1); }}
            disabled={totalGuests >= maxGuests}
          >
           <PlusIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestSelector;
