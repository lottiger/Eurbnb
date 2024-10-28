import React, { createContext, useContext, useState, useEffect } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery, useMutation } from 'convex/react';
import { api } from "@/convex/_generated/api";

type FavoritesContextType = {
  favoritedApartments: Id<"apartments">[];
  toggleFavorite: (apartmentId: Id<"apartments">) => Promise<void>;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const favoritesData = useQuery(api.functions.favorites.getUserFavorites) as { _id: Id<"apartments"> }[] | null;
  const [favoritedApartments, setFavoritedApartments] = useState<Id<"apartments">[]>([]);
  const toggleFavoriteMutation = useMutation(api.functions.favorites.toggleFavorite);

  useEffect(() => {
    // Extrahera _id från varje favoritobjekt
    if (favoritesData) {
      const favoriteIds = favoritesData.map(fav => fav._id);
      setFavoritedApartments(favoriteIds);
    }
  }, [favoritesData]);

  const toggleFavorite = async (apartmentId: Id<"apartments">) => {
    setFavoritedApartments(prev =>
      prev.includes(apartmentId) ? prev.filter(id => id !== apartmentId) : [...prev, apartmentId]
    );

    try {
      await toggleFavoriteMutation({ apartmentId });
    } catch (error) {
      console.error("Misslyckades att uppdatera favoriten i databasen:", error);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favoritedApartments, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites måste användas inom en FavoritesProvider");
  }
  return context;
};
