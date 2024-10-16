import { v } from 'convex/values';
import { Id } from '../_generated/dataModel';
import { mutation } from '../_generated/server';

type ApartmentInput = {
    titel: string;
    description: string;
    price: number;
    images: { id: string; src: string }[];
    country: string;
    city: string;
  }
  export const createApartment = mutation({
    args: {
      titel: v.string(),
      description: v.string(),
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
        price: apartmentData.price,
        images: apartmentData.images, // Sparar bilder som base64-strängar
        country: apartmentData.country,
        city: apartmentData.city,
        
      });
  
      console.log('Apartment created with ID:', id); // Lägg till loggning
      return id;
    },
  });