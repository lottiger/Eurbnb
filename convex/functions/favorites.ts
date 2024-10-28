import { mutation, query } from '../_generated/server';
import { Id } from '../_generated/dataModel';

// Mutation för att toggla favoritstatus för en lägenhet
export const toggleFavorite = mutation(async ({ db, auth }, { apartmentId }: { apartmentId: Id<"apartments"> }) => {
  const identity = await auth.getUserIdentity();
  const userId = identity?.subject;

  if (!userId || typeof userId !== 'string') {
    throw new Error('User not authenticated or user ID is invalid');
  }

  // Kontrollera om användaren redan har favoritmarkerat denna lägenhet
  const existingFavorite = await db
    .query('favorites')
    .filter(q => q.eq(q.field('userId'), userId))
    .filter(q => q.eq(q.field('apartmentId'), apartmentId))
    .first();

  if (existingFavorite) {
    // Ta bort om den redan är favoritmarkerad
    await db.delete(existingFavorite._id);
  } else {
    // Annars, lägg till som favorit
    await db.insert('favorites', {
      userId,
      apartmentId,
    });
  }
});

// Query för att hämta användarens favoritmarkerade lägenheter
export const getUserFavorites = query(async ({ db, auth, storage }) => {
  const identity = await auth.getUserIdentity();
  const userId = identity?.subject;

  // Om ingen användare är inloggad, returnera en tom lista
  if (!userId) {
    console.warn('User not authenticated when accessing favorites');
    return [];
  }

  // Hämta alla favoritmarkerade lägenheter för denna användare
  const favorites = await db
    .query('favorites')
    .filter(q => q.eq(q.field('userId'), userId))
    .collect();

  // Skapa lista med lägenheter baserat på användarens favoriter
  const favoriteApartments = await Promise.all(
    favorites.map(async (favorite) => {
      const apartment = await db.get(favorite.apartmentId);
      if (apartment) {
        // Hämta bild-URL:er för varje apartment
        const imageUrls = await Promise.all(
          apartment.images.map((imageId: Id<'_storage'>) => storage.getUrl(imageId))
        );
        return {
          ...apartment,
          images: imageUrls, // Byt ut bild-ID:n med URL:er för visning
        };
      }
      return null; // Om apartment inte finns, returnera null
    })
  );

  // Filtrera bort null-värden från lägenheter som inte längre existerar
  return favoriteApartments.filter(apartment => apartment !== null);
});
