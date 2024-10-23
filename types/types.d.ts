type ClerkUser = {
  id: string;
  email?: string;
  isAdmin: boolean;
};

// Typ för lägenheter som sparas i databasen
type Apartments = {
  _id?: string;
  titel: string;
  description: string;
  bedrooms: number;
  beds: number;
  price: number;
  images: Id<"_storage">[];
  country: string;
  city: string;
  createdAt?: Date;
};

type ApartmentInput = {
  title: string;
  description: string;
  bedrooms: number;
  beds: number;
  price: number;
  images: Id<"_storage">[]; // Ändrat från 'string' till 'Id<"_storage">[]' för att hantera flera bilder
  country: string;
  city: string;
};


// Typ för varje lägenhetsobjekt
type ApartmentData = {
  _id: Id<"apartments">;
  title: string;
  description: string;
  bedrooms: number;
  beds: number;
  price: number;
  images: string[]; // Array av bild-URL:er
  country: string;
  city: string;
};

interface CarouselProps {
  images: string[]; // En array av bild-URL:er
}

interface ApartmentImageProps {
  images: string[];
  apartmentId: Id<"apartments">;
  isFavorited: boolean;
  onToggleFavorite: () => void;
}
