import { mutation } from '../_generated/server';
import { Id } from '../_generated/dataModel'; // Importera Id-typen

export const toggleFavorite = mutation(async ({ db, auth }, { apartmentId }: { apartmentId: Id<"apartments"> }) => {
  const identity = await auth.getUserIdentity(); // Få användarens identitet via Clerk

  if (!identity || !identity.id) {
    throw new Error('User not authenticated');
  }

  const userId = identity.id as string; // Förvandla användar-ID till en string

  // Kontrollera om denna lägenhet redan är favoritmarkerad av användaren
  const existingFavorite = await db
    .query('favorites')
    .filter(q => q.eq(q.field('userId'), userId))
    .filter(q => q.eq(q.field('apartmentId'), apartmentId))
    .first();

  if (existingFavorite) {
    // Om den redan är favorit, ta bort den
    await db.delete(existingFavorite._id);
  } else {
    // Annars, lägg till den som favorit
    await db.insert('favorites', {
      userId,
      apartmentId,
    });
  }
});
