// /convex/functions/bookings.ts
import { mutation } from '../_generated/server';
import { Id } from '../_generated/dataModel';
import { v } from 'convex/values';

// Typ för bokningsdata
type BookingInput = {
  userId?: string; // Optional för anonym bokning
  apartmentId: Id<'apartments'>;
  title: string;
  checkInDate: string;
  checkOutDate: string;
  totalGuests: number;
  pricePerNight: number;
  totalPrice: number;
  isAnonymous: boolean;
};

// Mutation för att skapa en ny bokning
export const createBooking = mutation({
  args: {
    userId: v.optional(v.string()), // Optional för anonym bokning
    apartmentId: v.id('apartments'), // ID för lägenheten som `Id<'apartments'>`
    title: v.string(),
    checkInDate: v.string(),
    checkOutDate: v.string(),
    totalGuests: v.number(),
    pricePerNight: v.number(),
    totalPrice: v.number(),
    isAnonymous: v.boolean(),
  },
  handler: async (
    { db },
    {
      userId,
      apartmentId,
      title,
      checkInDate,
      checkOutDate,
      totalGuests,
      pricePerNight,
      totalPrice,
      isAnonymous,
    }: BookingInput
  ) => {
    // Skapa bokningsdatum
    const bookingDate = new Date().toISOString();

    // Skapa bokning i databasen
    const bookingId = await db.insert('bookings', {
      userId,
      apartmentId,
      title,
      checkInDate,
      checkOutDate,
      totalGuests,
      pricePerNight,
      totalPrice,
      bookingDate,
      isAnonymous,
    });

    // Returnera boknings-ID
    return bookingId;
  },
});
