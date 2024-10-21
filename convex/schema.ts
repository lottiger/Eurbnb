import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

const schema = defineSchema({
  apartments: defineTable({
    title: v.string(),
    description: v.string(),
    bedrooms: v.number(),
    beds: v.number(),
    price: v.number(),
    // Spara imageId för varje bild i _storage
   images:  v.array(v.id('_storage')),
    country: v.string(),
    city: v.string(),
  }),
});

export default schema;

