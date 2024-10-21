
import { v } from 'convex/values';
import { mutation } from '../_generated/server';

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



