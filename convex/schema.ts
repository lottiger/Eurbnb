import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

const schema = defineSchema({
    apartments: defineTable({
      titel: v.string(),
      description: v.string(),
      price: v.number(),
      images: v.array(v.object({ id: v.string(), src: v.string() })),
      country: v.string(),
      city: v.string(),
      
    }),
  });
  
  export default schema;