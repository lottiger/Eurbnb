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
    images: v.array(v.id('_storage')), 
    country: v.string(),
    city: v.string(),
    category: v.optional(v.union(v.literal('offer'), v.literal('popular'))), 
    rating: v.optional(v.number()), 
    amenities: v.optional(v.array(v.string())), 
    hostName: v.optional(v.string()), 
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
  const apartments = await ctx.db.query('apartments').collect();

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
});

// Query för att hämta lägenheter baserat på kategori
export const getApartmentsByCategory = query({
  args: {
    category: v.optional(v.union(v.literal('offer'), v.literal('popular'))), 
  },
  handler: async (ctx, { category }) => {
    let apartments;

    if (category) {
      apartments = await ctx.db.query('apartments')
        .filter(q => q.eq(q.field('category'), category))
        .collect();
    } else {
      apartments = await ctx.db.query('apartments').collect();
    }

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

// Query för att hämta en specifik lägenhet baserat på ID
export const getApartmentById = query({
  args: { _id: v.id('apartments') }, // Uppdaterat till _id
  handler: async (ctx, { _id }) => { // Använd _id istället för id
    const apartment = await ctx.db.get(_id);

    if (!apartment) {
      throw new Error(`Lägenheten med ID ${_id} hittades inte.`);
    }

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
  }
});

