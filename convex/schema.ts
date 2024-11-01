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
    rating: v.optional(v.number()), // Betyg, valbart och av typen nummer
    amenities: v.optional(v.array(v.string())), // Array av bekvämligheter, valbart och av typen array av strängar
    hostName: v.optional(v.string()), // Värdens namn, valbart och av typen sträng
  }),

  favorites: defineTable({
    userId: v.string(), // Clerk user ID
    apartmentId: v.id('apartments'), // Referens till lägenheten
  }),

  bookings: defineTable({
    userId: v.optional(v.string()), // Referens till inloggad användare (om inloggad), annars tom
    apartmentId: v.id('apartments'), // Referens till lägenheten som bokas
    title: v.string(), // Titel på lägenheten
    checkInDate: v.string(), // Incheckningsdatum
    checkOutDate: v.string(), // Utcheckningsdatum
    totalGuests: v.number(), // Antal gäster
    pricePerNight: v.number(), // Pris per natt
    totalPrice: v.number(), // Totalt pris för vistelsen
    bookingDate: v.string(), // Datum då bokningen gjordes
    isAnonymous: v.boolean(), // Indikerar om bokningen är anonym
  }),

});

export default schema;
