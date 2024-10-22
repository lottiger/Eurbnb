
import { v } from 'convex/values';
import { mutation, query } from '../_generated/server';

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
  },
 
  handler: async (ctx, { title, description, bedrooms, beds, price, images, country, city }) => {
    await ctx.db.insert('apartments', { title, description, bedrooms, beds, price, images, country, city });
  }
});


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
