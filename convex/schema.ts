import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

const schema = defineSchema({
  
  apartments: defineTable({
    title: v.string(),
    description: v.string(),
    bedrooms: v.number(),
    beds: v.number(),
    price: v.number(),
    images: v.array(v.id('_storage')),
    country: v.string(),
    city: v.string(),
    category: v.optional(v.union(v.literal('offer'), v.literal('popular'))), // Valbart fält
  }),
 
  
  favorites: defineTable({
    userId: v.string(), // Clerk user ID
    apartmentId: v.id('apartments'), // Referens till lägenheten
  }),
});

export default schema;
