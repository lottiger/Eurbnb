import { mutation } from '../_generated/server';
import { Id } from '../_generated/dataModel'; // Importera Id-typen

export const toggleFavorite = mutation(async ({ db, auth }, { apartmentId }: { apartmentId: Id<"apartments"> }) => {
  const identity = await auth.getUserIdentity(); // Få användarens identitet via Clerk

  // Använd `identity.subject` som är korrekt användar-ID
  const userId = identity?.subject;

  if (!userId || typeof userId !== 'string') {
    console.error("User not authenticated or user ID is invalid");
    throw new Error('User not authenticated or user ID is invalid');
  }

  // Kontrollera om användaren redan har favoritmarkerat den här lägenheten
  const existingFavorite = await db
    .query('favorites')
    .filter(q => q.eq(q.field('userId'), userId)) // Filtrera efter användarens ID
    .filter(q => q.eq(q.field('apartmentId'), apartmentId)) // Filtrera efter lägenhets-ID
    .first();

  if (existingFavorite) {
    // Om favorit redan existerar, ta bort den
    await db.delete(existingFavorite._id);
  } else {
    // Om inte, lägg till den som favorit
    await db.insert('favorites', {
      userId,
      apartmentId,
    });
  }
});
