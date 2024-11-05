'use client';
import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

const BookingsList: React.FC = () => {
  // Använd `useQuery` för att hämta bokningsdata
  const bookings = useQuery(api.functions.bookings.getBookings) || []; // Fallback till tom array om `null`

  // Definiera procentsatser för avgifterna
  const serviceFeePercentage = 0.10; // 10%
  const cleaningFeePercentage = 0.05; // 5%

  return (
    <div>
      {bookings.length > 0 ? (
        bookings.map((booking) => {
          // Formatera in- och utcheckningsdatum för varje bokning
          const formattedCheckInDate = booking.checkInDate
            ? new Date(booking.checkInDate).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long' })
            : '';
          const formattedCheckOutDate = booking.checkOutDate
            ? new Date(booking.checkOutDate).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long' })
            : '';

          // Beräkna antal nätter
          const nights = (new Date(booking.checkOutDate).getTime() - new Date(booking.checkInDate).getTime()) / (1000 * 60 * 60 * 24);

          // Dynamiska avgifter, avrundade till heltal
          const serviceFee = Math.round(booking.totalPrice * serviceFeePercentage);
          const cleaningFee = Math.round(booking.totalPrice * cleaningFeePercentage);

          return (
            <div key={booking._id.toString()} className='gap-4 mx-20'>
              <div className='mb-20 flex'>
                <div>
                  {booking.images.length > 0 ? (
                    <img src={booking.images[0]} alt="Apartment" style={{ width: '586px', height: '258px', objectFit: 'cover'}} className='rounded-lg' />
                  ) : (
                    <div style={{ width: '100px', height: '100px', backgroundColor: '#f0f0f0' }}>No Image</div>
                  )}
                </div>
                <div className='px-4 flex-1 text-[12px]'>
                  <div className='flex justify-between'>
                    <h2 className='font-semibold'>{booking.title}</h2>
                    <p>{booking.totalGuests} gäster</p>
                  </div>
                  <div className='flex items-center gap-2 text-gray-600'>
                    <p>{booking.bedrooms} sovrum</p>
                    <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="2.5271" cy="2.5" r="2.5" fill="black" fillOpacity="0.8" />
                    </svg>
                    <p>{booking.beds} sängar</p>
                  </div>
                  <div>
                    <p className='font-medium pt-2'>Datum</p>
                    <p>{formattedCheckInDate} - {formattedCheckOutDate}</p>
                  </div>
                  <div className='mt-28 pb-2'>
                    <div className='flex justify-between pb-2'>
                    <p className='underline'>Städavgift:</p>
                    <p>{cleaningFee} kr</p>
                    </div>
                    <div className='flex justify-between'>
                    <p className='underline'>EurBNB serviceavgift:</p>
                    <p>{serviceFee} kr</p>
                    </div>
                  </div>
                  <div className='flex justify-between'>
                    <div className='flex gap-1'>
                  <p>{Math.round(booking.pricePerNight)} kr</p>
                  <p>x {nights} nätter inklusive avgifter</p>
                  </div>
                  <div>
                  <p>Totalt: {Math.round(booking.totalPrice)} kr</p> {/* Avrundat totalpris */}
                  </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>Inga bokningar att visa.</p>
      )}
    </div>
  );
};

export default BookingsList;
