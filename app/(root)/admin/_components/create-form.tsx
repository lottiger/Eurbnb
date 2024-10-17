'use client';

import React, { useState } from 'react';
import { ImagePicker } from './image-picker'; // Se till att ImagePicker är korrekt importerad
import { useMutation } from 'convex/react'; // Importera useMutation-hooken
import { api } from '@/convex/_generated/api';

type ApartmentInput = {
  titel: string;
  description: string;
  bedrooms: number;
  beds: number;
  price: number;
  images: { id: string; src: string }[];
  country: string;
  city: string;
}

const CreateForm = (): JSX.Element => {
  // Hanterar formulärdata med useState och typad med ApartmentInput
  const [apartment, setApartment] = useState<ApartmentInput>({
    titel: '',
    description: '',
    bedrooms: 0,
    beds: 0,
    price: 0,
    country: '',
    city: '',
    images: [], // Initiera tom array för bilder
  });

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imageSrcs, setImageSrcs] = useState<string[]>([]);

  // Använd mutation för att skapa en ny lägenhet
  const createApartmentMutation = useMutation(api.functions.apartments.createApartment); // Använd rätt mutation

  // Hanterar inmatningsändringar i formuläret
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setApartment({
      ...apartment,
      [name]: ['price', 'beds', 'bedrooms'].includes(name) ? Number(value) : value,
    });
  };
  
  // Hanterar inlämningen av formuläret
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apartmentData = {
      ...apartment,
      images: imageSrcs.map((src, index) => ({ id: `${selectedImages[index]?.name}-${index}`, src })), // Lägg till bilderna i lägenhetsobjektet
    };
    console.log('Submitting apartment data:', apartmentData); // Lägg till loggning
    // Skicka datan till Convex
    try {
      await createApartmentMutation(apartmentData);
      alert('Lägenhet skapad!');
      // Återställ formuläret efter att det skickats
      setApartment({
        titel: '',
        description: '',
        bedrooms: 0,
        beds: 0,
        price: 0,
        country: '',
        city: '',
        images: [],
      });
      setSelectedImages([]);
      setImageSrcs([]);
    } catch (error) {
      console.error('Error creating apartment:', error);
      alert('Ett fel uppstod vid skapandet av lägenheten.');
    }
  };

  return (
    <div>
      <ImagePicker
        images={apartment.images}
        setSelectedImages={setSelectedImages}
        setImageSrcs={setImageSrcs}
      />
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Titel</label>
          <input
            type="text"
            name="titel"
            value={apartment.titel}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Beskrivning</label>
          <input
            type="text"
            name="description"
            value={apartment.description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Antal sovrum</label>
          <input
            type="number"
            name="bedrooms"
            value={apartment.bedrooms}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Antal sängar</label>
          <input
            type="number"
            name="beds"
            value={apartment.beds}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Pris per natt (SEK)</label>
          <input
            type="number"
            name="price"
            value={apartment.price}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Land</label>
          <input
            type="text"
            name="country"
            value={apartment.country}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Stad</label>
          <input
            type="text"
            name="city"
            value={apartment.city}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Skapa lägenhet
        </button>
      </form>
    </div>
  );
};

export default CreateForm;