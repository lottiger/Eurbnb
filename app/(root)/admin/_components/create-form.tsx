'use client';

import React, { useState, FormEvent } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from '@/convex/_generated/dataModel'; // Importera Id från Convex

export default function CreateApartment(): JSX.Element {
  // Importera rätt typ för att undvika "never" fel
const [apartment, setApartment] = useState<{
  title: string;
  description: string;
  bedrooms: number;
  beds: number;
  price: number;
  country: string;
  city: string;
  category: string;
  images: Id<"_storage">[]; // Typen för bilder
  rating?: number; // Valbart fält för betyg
  amenities: string[]; // Bekvämligheter som en array av strängar
  hostName?: string; // Värdens namn som valbart fält
}>({
  title: '',
  description: '',
  bedrooms: 0,
  beds: 0,
  price: 0,
  country: '',
  city: '',
  category: '',
  images: [],
  rating: undefined,
  amenities: [], // Initiera som tom array
  hostName: '',
});

  const generateUploadUrl = useMutation(api.functions.images.generateUploadUrl);
  const createApartment = useMutation(api.functions.apartments.createApartment);

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedImages((prevSelectedImages) => [...prevSelectedImages, ...filesArray]);

      const newPreviews: string[] = [];
      filesArray.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newPreviews.push(event.target.result as string);
            setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let images: Id<"_storage">[] = [];
    try {
      if (selectedImages.length > 0) {
        for (const image of selectedImages) {
          const postUrl = await generateUploadUrl();
          const result = await fetch(postUrl, {
            method: 'POST',
            headers: { "content-type": image.type },
            body: image,
          });
          const { storageId } = await result.json();
          images.push(storageId);
        }
      } else {
        throw new Error('No images selected');
      }
    } catch (error) {
      console.error('Image upload failed:', error);
    }

    const validCategory = apartment.category === 'offer' || apartment.category === 'popular'
      ? apartment.category
      : undefined;

    try {
      await createApartment({
        ...apartment,
        images,
        category: validCategory,
        rating: apartment.rating || undefined,
        amenities: apartment.amenities.length > 0 ? apartment.amenities : undefined,
        hostName: apartment.hostName || undefined,
      });
      alert('Lägenhet skapad framgångsrikt!');
      setApartment({
        title: '',
        description: '',
        bedrooms: 0,
        beds: 0,
        price: 0,
        country: '',
        city: '',
        category: '',
        images: [],
        rating: undefined,
        amenities: [],
        hostName: '',
      });
      setSelectedImages([]);
      setImagePreviews([]);
    } catch (error) {
      console.error('Error creating apartment:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApartment({
      ...apartment,
      [name]: ['price', 'bedrooms', 'beds', 'rating'].includes(name) ? Number(value) : value,
    });
  };

  const handleAmenitiesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const amenities = e.target.value.split(',').map((item) => item.trim());
    setApartment({
      ...apartment,
      amenities,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
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

        <div className="mt-4">
          <label htmlFor="category">Kategori:</label>
          <select
            id="category"
            name="category"
            value={apartment.category}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Välj kategori</option>
            <option value="offer">Erbjudanden</option>
            <option value="popular">Populära destinationer</option>
          </select>
        </div>

        <div className="mt-4">
          <label htmlFor="rating">Betyg:</label>
          <input
            id="rating"
            name="rating"
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={apartment.rating || ''}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="amenities">Bekvämligheter (komma-separerade):</label>
          <textarea
            id="amenities"
            name="amenities"
            value={apartment.amenities.join(', ')}
            onChange={handleAmenitiesChange}
            className="block w-full mt-1 border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="hostName">Värdens namn:</label>
          <input
            id="hostName"
            name="hostName"
            value={apartment.hostName}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="images">Lägg till bilder:</label>
          <input
            id="images"
            type="file"
            multiple
            onChange={handleImageChange}
            className="block w-full mt-1 border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
          {imagePreviews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`Selected preview ${index}`}
              className="w-full h-auto border rounded"
            />
          ))}
        </div>

        <button type="submit" className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Skapa lägenhet
        </button>
      </form>
    </div>
  );
}
