'use client'
import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

// type BookingData = {
//     _id: Id<"bookings">; // Convex-ID för bokningen
//     userId?: string; // Optional om bokningen är anonym
//     apartmentId: Id<"apartments">;
//     title: string;
//     checkInDate: string;
//     checkOutDate: string;
//     totalGuests: number;
//     pricePerNight: number;
//     totalPrice: number;
//     bookingDate: string; // Datum för när bokningen skapades
//     isAnonymous: boolean;
//   };
  

const BookingsList: React.FC = () => {
  // Använd `useQuery` för att hämta bokningsdata
  const bookings = useQuery(api.functions.bookings.getBookings) || []; // Fallback till tom array om `null`

  return (
    <div>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking._id.toString()} style={{ border: '1px solid #ccc', padding: '16px', margin: '16px 0' }}>
            <div>
              {booking.images.length > 0 ? (
                <img src={booking.images[0]} alt="Apartment" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100px', height: '100px', backgroundColor: '#f0f0f0' }}>No Image</div>
              )}
            </div>
            <div>
              <h1>{booking.title}</h1>
              <p>Antal gäster: {booking.totalGuests}</p>
            </div>
            <div>
              <p>Datum</p>
              <p>{booking.checkInDate} - {booking.checkOutDate}</p>
            </div>
            <div>
              <p>{booking.pricePerNight} kr / natt</p>
              <p>{(new Date(booking.checkOutDate).getTime() - new Date(booking.checkInDate).getTime()) / (1000 * 60 * 60 * 24)} nätter</p>
              <p>Totalpris: {booking.totalPrice} kr</p>
            </div>
          </div>
        ))
      ) : (
        <p>Inga bokningar att visa.</p>
      )}
    </div>
  );
};

export default BookingsList;
