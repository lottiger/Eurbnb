// /convex/functions/bookings.ts
import { mutation, query } from '../_generated/server';
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

export const getBookings = query(async ({ db, auth, storage }) => {
  const identity = await auth.getUserIdentity();
  const userId = identity?.subject;

  // Om ingen användare är inloggad, returnera en tom lista
  if (!userId) {
    console.warn('User not authenticated when accessing bookings');
    return [];
  }



  // Skapa lista med lägenheter baserat på användarens bokningar
  const bookings = await db
  .query('bookings')
  .filter(q => q.eq(q.field('userId'), userId))
  .collect();

// Skapa lista med lägenheter baserat på användarens bokningar
const MyBookings = await Promise.all(
  bookings.map(async (booking) => {
    const apartment = await db.get(booking.apartmentId);
    if (apartment) {
      // Kontrollera om det finns bilder och hämta bara första bilden om det finns någon
      const firstImageUrl = apartment.images.length > 0 
        ? await storage.getUrl(apartment.images[0]) // Hämta URL för första bilden
        : null; // Om inga bilder finns, sätt till null

      return {
        ...apartment,
        images: firstImageUrl ? [firstImageUrl] : [], // Endast första bilden i en array
       title: booking.title, // Lägg till bokningsinformation
        bookingId: booking._id, // Lägg till bokningsinformation
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
        totalPrice: booking.totalPrice,
        totalGuests: booking.totalGuests,
        pricePerNight: booking.pricePerNight,
      };
    }
    return null; // Om apartment inte finns, returnera null
  })
);

// Filtrera bort null-värden från lägenheter som inte längre existerar
return MyBookings.filter(apartment => apartment !== null);
}
);
