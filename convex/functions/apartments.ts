import { v } from 'convex/values';
import { mutation, query } from '../_generated/server';

// Mutation för att skapa en ny lägenhet
export const createApartment = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    bedrooms: v.number(),
    beds: v.number(),
    price: v.number(),
    images: v.array(v.id('_storage')), // Ändrat för att stödja en array av bilder
    country: v.string(),
    city: v.string(),
    category: v.optional(v.union(v.literal('offer'), v.literal('popular'))), // Valbart fält för kategori
    rating: v.optional(v.number()), // Betyg, valbart och av typen nummer
    amenities: v.optional(v.array(v.string())), // Array av bekvämligheter, valbart och av typen array av strängar
    hostName: v.optional(v.string()), // Värdens namn, valbart och av typen sträng
  },
  
  handler: async (ctx, { title, description, bedrooms, beds, price, images, country, city, category, rating, amenities, hostName }) => {
    await ctx.db.insert('apartments', { 
      title, 
      description, 
      bedrooms, 
      beds, 
      price, 
      images, 
      country, 
      city,
      rating,
      amenities,
      hostName,
      ...(category ? { category } : {})
    });
  }
});

// Query för att hämta alla lägenheter med bild-URL:er
export const getApartmentsWithImages = query(async (ctx) => {
  // Hämta alla lägenheter
  const apartments = await ctx.db.query('apartments').collect();

  // Loop igenom varje lägenhet och hämta bilderna från _storage
  const apartmentsWithImages = await Promise.all(
    apartments.map(async (apartment) => {
      const images = await Promise.all(
        apartment.images.map(async (imageId) => {
          const url = await ctx.storage.getUrl(imageId);
          return url; // Returnerar URL för varje bild
        })
      );

      return {
        ...apartment,
        images, // Lägg till bild-URL:erna i lägenhetsobjektet
      };
    })
  );

  return apartmentsWithImages;
});

// Query för att hämta lägenheter baserat på kategori
export const getApartmentsByCategory = query({
  args: {
    category: v.optional(v.union(v.literal('offer'), v.literal('popular'))), // Valbart argument för kategori
  },
  
  handler: async (ctx, { category }) => {
    let apartments;

    if (category) {
      // Hämta lägenheter som matchar den angivna kategorin
      apartments = await ctx.db.query('apartments')
        .filter(q => q.eq(q.field('category'), category))
        .collect();
    } else {
      // Hämta alla lägenheter om ingen kategori är specificerad
      apartments = await ctx.db.query('apartments').collect();
    }

    // Loop igenom varje lägenhet och hämta bilderna från _storage
    const apartmentsWithImages = await Promise.all(
      apartments.map(async (apartment) => {
        const images = await Promise.all(
          apartment.images.map(async (imageId) => {
            const url = await ctx.storage.getUrl(imageId);
            return url;
          })
        );

        return {
          ...apartment,
          images,
        };
      })
    );

    return apartmentsWithImages;
  }
});