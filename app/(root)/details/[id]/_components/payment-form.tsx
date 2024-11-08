'use client';

import React, { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useSearchParams, useParams, useRouter } from 'next/navigation';
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
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // State för felmeddelanden

  const params = useParams();
  const searchParams = useSearchParams();
  const { isSignedIn, userId } = useAuth(); // useAuth moved here
  const router = useRouter();
  const createBookingMutation = useMutation(api.functions.bookings.createBooking);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Rensa eventuellt fel för det aktuella fältet
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName) newErrors.firstName = 'Förnamn är obligatoriskt';
    if (!formData.lastName) newErrors.lastName = 'Efternamn är obligatoriskt';
    if (!formData.address) newErrors.address = 'Adress är obligatoriskt';
    if (!formData.postalCode) newErrors.postalCode = 'Postnummer är obligatoriskt';
    if (!formData.city) newErrors.city = 'Ort är obligatorisk';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Ogiltig e-postadress';
    if (!formData.phone || !/^\d+$/.test(formData.phone)) newErrors.phone = 'Telefonnummer ska bara innehålla siffror';
    if (!formData.cardNumber || !/^\d{16}$/.test(formData.cardNumber)) newErrors.cardNumber = 'Kortnummer ska vara 16 siffror';
    if (!formData.cardExpiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.cardExpiry)) newErrors.cardExpiry = 'Datum ska vara i formatet MM/YY';
    if (!formData.cardCVV || !/^\d{3,4}$/.test(formData.cardCVV)) newErrors.cardCVV = 'CVV ska vara 3-4 siffror';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return; // Avbryt om formuläret inte är giltigt

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

      router.push('/details/[id]/confirmation');
    } catch (error) {
      console.error('Bokningen misslyckades:', error);
    }
  };

  return (
    <>
      <h3 className="font-semibold text-lg md:text-2xl text-center mb-4 mt-10">Dina kontaktuppgifter</h3>
      <div className="flex justify-center items-center px-4 md:px-0 mx-4 md:mx-0">
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-lg gap-3">
          <div className="flex flex-col md:flex-row gap-3 w-full">
            <div className="w-full md:flex-1">
              <input
                className="border rounded-md p-2 border-gray-500 w-full"
                type="text"
                placeholder="Förnamn"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </div>
            <div className="w-full md:flex-1">
              <input
                className="border rounded-md p-2 border-gray-500 w-full"
                type="text"
                placeholder="Efternamn"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </div>
          </div>
          <div className="w-full">
            <input
              className="border rounded-md p-2 border-gray-500 w-full"
              type="text"
              placeholder="Adress"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>
          <div className="flex flex-col md:flex-row gap-3 w-full">
            <div className="w-full md:flex-1">
              <input
                className="border rounded-md p-2 border-gray-500 w-full"
                type="text"
                placeholder="Postnummer"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
              />
              {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode}</p>}
            </div>
            <div className="w-full md:flex-1">
              <input
                className="border rounded-md p-2 border-gray-500 w-full"
                type="text"
                placeholder="Ort"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
              {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
            </div>
          </div>
          <div className="w-full">
            <input
              className="border rounded-md p-2 border-gray-500 w-full"
              type="text"
              placeholder="Mailadress"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="w-full">
            <input
              className="border rounded-md p-2 border-gray-500 w-full"
              type="text"
              placeholder="Telefonnummer"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
          <h4 className="font-semibold text-lg md:text-2xl mb-4 mt-6">Betalning</h4>
          <div className="w-full">
            <input
              className="border rounded-md p-2 border-gray-500 w-full"
              type="text"
              placeholder="Kortnummer"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
            />
            {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
          </div>
          <div className="flex flex-col md:flex-row gap-3 w-full">
            <div className="w-full md:flex-1">
              <input
                className="border rounded-md p-2 border-gray-500 w-full"
                type="text"
                placeholder="Datum"
                name="cardExpiry"
                value={formData.cardExpiry}
                onChange={handleInputChange}
              />
              {errors.cardExpiry && <p className="text-red-500 text-sm">{errors.cardExpiry}</p>}
            </div>
            <div className="w-full md:flex-1">
              <input
                className="border rounded-md p-2 border-gray-500 w-full"
                type="text"
                placeholder="CVV"
                name="cardCVV"
                value={formData.cardCVV}
                onChange={handleInputChange}
              />
              {errors.cardCVV && <p className="text-red-500 text-sm">{errors.cardCVV}</p>}
            </div>
          </div>
          <button
            className="mt-6 text-lg px-8 py-2 w-full md:w-auto bg-[#1E3E62] text-white rounded-md hover:bg-[#2A4F7A]"
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
