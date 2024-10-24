'use client';

import React, { useState, FormEvent } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from '@/convex/_generated/dataModel'; // Importera Id från Convex

export default function CreateApartment(): JSX.Element {
  const [apartment, setApartment] = useState({
    title: '',
    description: '',
    bedrooms: 0,
    beds: 0,
    price: 0,
    country: '',
    city: '',
    category: '', // Nytt fält för kategori
    images: [], // Tom array för bilder
  });

  const generateUploadUrl = useMutation(api.functions.images.generateUploadUrl);
  const createApartment = useMutation(api.functions.apartments.createApartment);

  const [selectedImages, setSelectedImages] = useState<File[]>([]); // Filobjekt
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // Förhandsvisning av bilder

  // Hantera filinmatning och generera förhandsvisningar
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files); // Konvertera FileList till en array av File-objekt

      // Kombinera tidigare valda filer med de nya filerna
      setSelectedImages((prevSelectedImages) => [...prevSelectedImages, ...filesArray]);

      // Generera förhandsvisningar
      const newPreviews: string[] = [];
      filesArray.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newPreviews.push(event.target.result as string);
            setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]); // Lägg till nya förhandsvisningar
          }
        };
        reader.readAsDataURL(file); // Läsa in varje bild och skapa en base64-url för förhandsvisning
      });
    }
  };

  // Hantera form-inlämning
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let images: Id<"_storage">[] = []; // Array för lagrade bild-ID:n

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
          images.push(storageId); // Lägg till varje bilds storageId i arrayen
        }
      } else {
        throw new Error('No images selected');
      }
    } catch (error) {
      console.error('Image upload failed:', error);
    }

    // Validera att kategorin är korrekt
    const validCategory = apartment.category === 'offer' || apartment.category === 'popular'
      ? apartment.category
      : undefined;

    try {
      // Skicka uppdaterad lägenhetsdata till API:et
      await createApartment({
        title: apartment.title,
        description: apartment.description,
        bedrooms: apartment.bedrooms,
        beds: apartment.beds,
        price: apartment.price,
        images: images, // Skicka arrayen av bild-ID:n till API:et
        country: apartment.country,
        city: apartment.city,
        category: validCategory, // Skicka validerad kategori eller undefined
      });
      alert('Lägenhet skapad framgångsrikt!');
      // Återställ formuläret
      setApartment({
        title: '',
        description: '',
        bedrooms: 0,
        beds: 0,
        price: 0,
        country: '',
        city: '',
        category: '',
        images: [], // Återställ bilder
      });
      setSelectedImages([]); // Nollställ valda bilder
      setImagePreviews([]); // Nollställ förhandsvisningar
    } catch (error) {
      console.error('Error creating apartment:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setApartment({
      ...apartment,
      [name]: ['price', 'bedrooms', 'beds'].includes(name) ? Number(value) : value,
    });
  };

  return (
    <div>
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

        {/* Kategori (erbjudanden eller populära destinationer) */}
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

        {/* Lägg till bilder */}
        <div className="mt-4">
          <label htmlFor="images">Lägg till bilder:</label>
          <input
            id="images"
            type="file"
            multiple
            onChange={handleImageChange} // Hantera bildinmatning och förhandsvisning
            className="block w-full mt-1 border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Förhandsgranskning av bilder */}
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

        {/* Skapa Lägenhet-knapp */}
        <button type="submit" className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Skapa lägenhet
        </button>
      </form>
    </div>
  );
}
