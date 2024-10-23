import { mutation, query } from '../_generated/server';
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





export const getUserFavorites = query(async ({ db, auth, storage }) => {
  const identity = await auth.getUserIdentity(); // Hämta användarens identitet

  if (!identity?.subject) {
    throw new Error('User not authenticated');
  }

  const userId = identity.subject;

  // Hämta alla favoritmarkerade lägenheter för denna användare
  const favorites = await db.query('favorites')
    .filter(q => q.eq(q.field('userId'), userId))
    .collect();

  const favoriteApartments = [];

  // Hämta detaljerna för varje favoritmarkerad lägenhet
  for (const favorite of favorites) {
    const apartment = await db.get(favorite.apartmentId);
    if (apartment) {
      // Hämta bilder för varje apartment via dess storageId om det behövs
      const imageUrls = await Promise.all(
        apartment.images.map(async (imageId: any) => {
          return storage.getUrl(imageId); // Antag att du lagrar bilder i Convex storage
        })
      );

      favoriteApartments.push({
        ...apartment,
        images: imageUrls // Ersätt bild-ID:n med URL:er för visning
      });
    }
  }

  return favoriteApartments;
});



