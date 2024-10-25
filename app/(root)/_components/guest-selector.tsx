import React, { useState, useEffect } from 'react';

interface GuestSelectorProps {
  onGuestUpdate: (adults: number, children: number, infants: number) => void; // Prop för att skicka tillbaka gästerna
  onClose: () => void; // Ny prop för att stänga GuestSelector
}

const GuestSelector: React.FC<GuestSelectorProps> = ({ onGuestUpdate, onClose }) => {
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const maxGuests = 10; // Max antal gäster totalt

  // Uppdaterar antalet vuxna, barn och spädbarn och skickar tillbaka det till föräldrakomponenten
  useEffect(() => {
    onGuestUpdate(adults, children, infants);
  }, [adults, children, infants]);

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
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 7H11M13.5 7C13.5 8.72391 12.8152 10.3772 11.5962 11.5962C10.3772 12.8152 8.72391 13.5 7 13.5C5.27609 13.5 3.62279 12.8152 2.40381 11.5962C1.18482 10.3772 0.5 8.72391 0.5 7C0.5 5.27609 1.18482 3.62279 2.40381 2.40381C3.62279 1.18482 5.27609 0.5 7 0.5C8.72391 0.5 10.3772 1.18482 11.5962 2.40381C12.8152 3.62279 13.5 5.27609 13.5 7Z" stroke="black" />
            </svg>
          </button>
          <span className='px-[22px]'>{adults}</span>
          <button 
            onClick={() => { if (totalGuests < maxGuests) setAdults(adults + 1); }}
            disabled={totalGuests >= maxGuests}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 0C3.13403 0 0 3.13403 0 7C0 10.8662 3.13403 14 7 14C10.8662 14 14 10.8662 14 7C14 3.13403 10.8662 0 7 0ZM7 13.1388C3.62272 13.1388 0.875 10.3773 0.875 6.99997C0.875 3.62269 3.62272 0.874973 7 0.874973C10.3773 0.874973 13.125 3.6227 13.125 6.99997C13.125 10.3772 10.3773 13.1388 7 13.1388ZM10.0625 6.5625H7.4375V3.9375C7.4375 3.696 7.2415 3.5 7 3.5C6.7585 3.5 6.5625 3.696 6.5625 3.9375V6.5625H3.9375C3.696 6.5625 3.5 6.7585 3.5 7C3.5 7.2415 3.696 7.4375 3.9375 7.4375H6.5625V10.0625C6.5625 10.304 6.7585 10.5 7 10.5C7.2415 10.5 7.4375 10.304 7.4375 10.0625V7.4375H10.0625C10.304 7.4375 10.5 7.2415 10.5 7C10.5 6.7585 10.304 6.5625 10.0625 6.5625Z" fill="black" />
            </svg>
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
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 7H11M13.5 7C13.5 8.72391 12.8152 10.3772 11.5962 11.5962C10.3772 12.8152 8.72391 13.5 7 13.5C5.27609 13.5 3.62279 12.8152 2.40381 11.5962C1.18482 10.3772 0.5 8.72391 0.5 7C0.5 5.27609 1.18482 3.62279 2.40381 2.40381C3.62279 1.18482 5.27609 0.5 7 0.5C8.72391 0.5 10.3772 1.18482 11.5962 2.40381C12.8152 3.62279 13.5 5.27609 13.5 7Z" stroke="black" />
            </svg>
          </button>
          <span className='px-[22px]'>{children}</span>
          <button 
            onClick={() => { if (totalGuests < maxGuests) setChildren(children + 1); }}
            disabled={totalGuests >= maxGuests}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 0C3.13403 0 0 3.13403 0 7C0 10.8662 3.13403 14 7 14C10.8662 14 14 10.8662 14 7C14 3.13403 10.8662 0 7 0ZM7 13.1388C3.62272 13.1388 0.875 10.3773 0.875 6.99997C0.875 3.62269 3.62272 0.874973 7 0.874973C10.3773 0.874973 13.125 3.6227 13.125 6.99997C13.125 10.3772 10.3773 13.1388 7 13.1388ZM10.0625 6.5625H7.4375V3.9375C7.4375 3.696 7.2415 3.5 7 3.5C6.7585 3.5 6.5625 3.696 6.5625 3.9375V6.5625H3.9375C3.696 6.5625 3.5 6.7585 3.5 7C3.5 7.2415 3.696 7.4375 3.9375 7.4375H6.5625V10.0625C6.5625 10.304 6.7585 10.5 7 10.5C7.2415 10.5 7.4375 10.304 7.4375 10.0625V7.4375H10.0625C10.304 7.4375 10.5 7.2415 10.5 7C10.5 6.7585 10.304 6.5625 10.0625 6.5625Z" fill="black" />
            </svg>
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
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 7H11M13.5 7C13.5 8.72391 12.8152 10.3772 11.5962 11.5962C10.3772 12.8152 8.72391 13.5 7 13.5C5.27609 13.5 3.62279 12.8152 2.40381 11.5962C1.18482 10.3772 0.5 8.72391 0.5 7C0.5 5.27609 1.18482 3.62279 2.40381 2.40381C3.62279 1.18482 5.27609 0.5 7 0.5C8.72391 0.5 10.3772 1.18482 11.5962 2.40381C12.8152 3.62279 13.5 5.27609 13.5 7Z" stroke="black" />
            </svg>
          </button>
          <span className='px-[22px]'>{infants}</span>
          <button 
            onClick={() => { if (totalGuests < maxGuests) setInfants(infants + 1); }}
            disabled={totalGuests >= maxGuests}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 0C3.13403 0 0 3.13403 0 7C0 10.8662 3.13403 14 7 14C10.8662 14 14 10.8662 14 7C14 3.13403 10.8662 0 7 0ZM7 13.1388C3.62272 13.1388 0.875 10.3773 0.875 6.99997C0.875 3.62269 3.62272 0.874973 7 0.874973C10.3773 0.874973 13.125 3.6227 13.125 6.99997C13.125 10.3772 10.3773 13.1388 7 13.1388ZM10.0625 6.5625H7.4375V3.9375C7.4375 3.696 7.2415 3.5 7 3.5C6.7585 3.5 6.5625 3.696 6.5625 3.9375V6.5625H3.9375C3.696 6.5625 3.5 6.7585 3.5 7C3.5 7.2415 3.696 7.4375 3.9375 7.4375H6.5625V10.0625C6.5625 10.304 6.7585 10.5 7 10.5C7.2415 10.5 7.4375 10.304 7.4375 10.0625V7.4375H10.0625C10.304 7.4375 10.5 7.2415 10.5 7C10.5 6.7585 10.304 6.5625 10.0625 6.5625Z" fill="black" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestSelector;
