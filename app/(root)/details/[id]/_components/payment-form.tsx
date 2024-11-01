// /components/PaymentForm.tsx
'use client';

import React, { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useSearchParams, useParams } from 'next/navigation';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { Id } from '@/convex/_generated/dataModel';

const PaymentForm = (): JSX.Element => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    postalCode: '',
    city: '',
    email: '',
    phone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
  });

  const params = useParams();
  const searchParams = useSearchParams();

  // Säkerställ att `apartmentId` är en `string`, annars hantera det.
  const apartmentId = typeof params.id === 'string' ? (params.id as Id<'apartments'>) : null;

  if (!apartmentId) {
    console.error("Apartment ID is missing or invalid");
    return <p>Apartment ID saknas. Kan inte fortsätta med bokningen.</p>;
  }

  const title = searchParams.get('title') || '';
  const checkInDate = searchParams.get('checkInDate') || '';
  const checkOutDate = searchParams.get('checkOutDate') || '';
  const totalGuests = Number(searchParams.get('totalGuests') || 0);
  const pricePerNight = Number(searchParams.get('pricePerNight') || 0);
  const totalPrice = Number(searchParams.get('totalPrice') || 0);

  const { isSignedIn, userId } = useAuth();

  const createBookingMutation = useMutation(api.functions.bookings.createBooking);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createBookingMutation({
        userId: isSignedIn ? userId || undefined : undefined,
        apartmentId,
        title,
        checkInDate,
        checkOutDate,
        totalGuests,
        pricePerNight,
        totalPrice,
        isAnonymous: !isSignedIn,
      });

      alert('Bokningen genomförd!');
    } catch (error) {
      console.error('Bokningen misslyckades:', error);
      alert('Ett fel inträffade, försök igen.');
    }
  };

  return (
    <>
      <h3 className="font-semibold text-[20px] text-center mb-2 mt-10">Dina kontaktuppgifter</h3>
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col w-[570px] gap-2">
          <div className="flex gap-2 w-full">
            <input
              className="border rounded-md p-[8px] border-gray-500 flex-1"
              type="text"
              placeholder="Förnamn"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <input
              className="border rounded-md p-[8px] border-gray-500 flex-1"
              type="text"
              placeholder="Efternamn"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full">
            <input
              className="border rounded-md p-[8px] border-gray-500 w-full"
              type="text"
              placeholder="Adress"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-2 w-full">
            <input
              className="border rounded-md p-[8px] border-gray-500 flex-1"
              type="text"
              placeholder="Postnummer"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
            />
            <input
              className="border rounded-md p-[8px] border-gray-500 flex-1"
              type="text"
              placeholder="Ort"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full">
            <input
              className="border rounded-md p-[8px] border-gray-500 w-full"
              type="text"
              placeholder="Mailadress"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full">
            <input
              className="border rounded-md p-[8px] border-gray-500 w-full"
              type="text"
              placeholder="Telefonnummer"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <h4 className="font-semibold text-[20px] mb-2 mt-5">Betalning</h4>
          <div className="w-full">
            <input
              className="border rounded-md p-[8px] border-gray-500 w-full"
              type="text"
              placeholder="Kortnummer"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-2 w-full">
            <input
              className="border rounded-md p-[8px] border-gray-500 flex-1"
              type="text"
              placeholder="Datum"
              name="cardExpiry"
              value={formData.cardExpiry}
              onChange={handleInputChange}
            />
            <input
              className="border rounded-md p-[8px] border-gray-500 flex-1"
              type="text"
              placeholder="CVV"
              name="cardCVV"
              value={formData.cardCVV}
              onChange={handleInputChange}
            />
          </div>
          <button
            className="my-4 text-[16px] px-[20px] w-[355px] h-[46px] bg-[#1E3E62] text-white rounded-md hover:bg-[#2A4F7A]"
            type="submit"
          >
            Reservera och betala
          </button>
        </form>
      </div>
    </>
  );
};

export default PaymentForm;
