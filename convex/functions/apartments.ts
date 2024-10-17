import { v } from 'convex/values';
import { Id } from '../_generated/dataModel';
import { mutation, query } from '../_generated/server';

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
  export const createApartment = mutation({
    args: {
      titel: v.string(),
      description: v.string(),
      bedrooms: v.number(),
      beds: v.number(),
      price: v.number(),
      images: v.array(v.object({ id: v.string(), src: v.string() })),
      country: v.string(),
      city: v.string(),
    },
    handler: async ({ db }, apartmentData: ApartmentInput) => {
      console.log('Creating apartment with data:', apartmentData); // Lägg till loggning
      // Lägg till lägenheten och bilder i databasen
      const id: Id<"apartments"> = await db.insert("apartments", {
        titel: apartmentData.titel,
        description: apartmentData.description,
        bedrooms: apartmentData.bedrooms,
        beds: apartmentData.beds,
        price: apartmentData.price,
        images: apartmentData.images, // Sparar bilder som base64-strängar
        country: apartmentData.country,
        city: apartmentData.city,
        
      });
  
      console.log('Apartment created with ID:', id); // Lägg till loggning
      return id;
    },
  });

// Query-funktion för att hämta lägenheter från databasen
export const getApartments = query(async ({ db }) => {
    const apartments = await db.query("apartments").collect();
    return apartments;
  });