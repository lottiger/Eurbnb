'use client';

import React, { useState, FormEvent } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from '@/convex/_generated/dataModel'; // Importera Id från Convex
import { ImagePicker } from "./image-picker";

// type ApartmentInput = {
//   title: string;
//   description: string;
//   bedrooms: number;
//   beds: number;
//   price: number;
//   images: Id<"_storage">[]; // Ändrat till array av Id<"_storage">
//   country: string;
//   city: string;
// };

// Props för ImagePicker-komponenten
interface ImagePickerProps {
  images?: string[]; // Array med bilders källor (src)
  setSelectedImages: (files: File[]) => void; // Funktion för att hantera valda bilder
  setImageSrcs: (srcs: string[]) => void; // Funktion för att hantera bilders källor (src)
}

export default function CreateApartment(): JSX.Element {
  const [apartment, setApartment] = useState<ApartmentInput>({
    title: '',
    description: '',
    bedrooms: 0,
    beds: 0,
    price: 0,
    country: '',
    city: '',
    images: [], // Initial tom array för bilder
  });

  const generateUploadUrl = useMutation(api.functions.images.generateUploadUrl);
  const createApartment = useMutation(api.functions.apartments.createApartment);

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imageSrc, setImageSrc] = useState<string[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let images: Id<"_storage">[] = []; // Array för Id<"_storage"> för uppladdade bilder

    try {
      if (selectedImages.length > 0) {
        for (const image of selectedImages) {
          const postUrl = await generateUploadUrl();
          const result = await fetch(postUrl, {
            method: 'POST',
            headers: { "content-type": image.type },
            body: image
          });
          const { storageId } = await result.json();
          images.push(storageId); // Lägg till varje bilds storageId i arrayen
        }
      } else {
        throw new Error('No images selected');
      }
    } catch (error) {
      console.error('Image upload failed:', error);
    }

    try {
      await createApartment({
        title: apartment.title,
        description: apartment.description,
        bedrooms: apartment.bedrooms,
        beds: apartment.beds,
        price: apartment.price,
        images: images, // Använd arrayen av Id<"_storage"> för bilder
        country: apartment.country,
        city: apartment.city,
      });
      alert('Apartment created successfully!');
      // Återställ formuläret
      setApartment({
        title: '',
        description: '',
        bedrooms: 0,
        beds: 0,
        price: 0,
        country: '',
        city: '',
        images: [], // Nollställ bilderna efter uppladdning
      });
      setSelectedImages([]);
      setImageSrc([]);
    } catch (error) {
      console.error('Error creating apartment:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setApartment({
      ...apartment,
      [name]: ['price', 'bedrooms', 'beds'].includes(name) ? Number(value) : value,
    });
  };

  return (
    <div>
      <ImagePicker images={[]} setSelectedImages={setSelectedImages} setImageSrcs={setImageSrc} />

      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
        {/* Titel */}
        <div>
          <label htmlFor="title">Titel:</label>
          <input
            id="title"
            name="title"
            value={apartment.title}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Beskrivning */}
        <div className="mt-4">
          <label htmlFor="description">Beskrivning:</label>
          <input
            id="description"
            name="description"
            value={apartment.description}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Sovrum */}
        <div className="mt-4">
          <label htmlFor="bedrooms">Antal sovrum:</label>
          <input
            id="bedrooms"
            name="bedrooms"
            type="number"
            value={apartment.bedrooms}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Sängar */}
        <div className="mt-4">
          <label htmlFor="beds">Antal sängar:</label>
          <input
            id="beds"
            name="beds"
            type="number"
            value={apartment.beds}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Pris */}
        <div className="mt-4">
          <label htmlFor="price">Pris per natt:</label>
          <input
            id="price"
            name="price"
            type="number"
            value={apartment.price}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Land */}
        <div className="mt-4">
          <label htmlFor="country">Land:</label>
          <input
            id="country"
            name="country"
            value={apartment.country}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Stad */}
        <div className="mt-4">
          <label htmlFor="city">Stad:</label>
          <input
            id="city"
            name="city"
            value={apartment.city}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Skapa Lägenhet-knapp */}
        <button type="submit" className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Skapa lägenhet
        </button>
      </form>
    </div>
  );
}
