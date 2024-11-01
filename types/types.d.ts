import { Id } from '@/convex/_generated/dataModel'; // För att hämta Id-typen

// Typ för Clerk-användare
type ClerkUser = {
  id: string;
  email?: string;
  isAdmin: boolean;
};

// Typ för lägenheter som sparas i databasen
type Apartments = {
  _id?: Id<"apartments">; // Convex-ID
  title: string;
  description: string;
  bedrooms: number;
  beds: number;
  price: number;
  images: Id<"_storage">[]; // Lagrar bilder som referenser till _storage
  country: string;
  city: string;
  category?: 'offer' | 'popular' | null; // Kategorifält som kan vara valbart
  createdAt?: Date;
  rating?: number; // Valbart betygsfält
  amenities?: string[]; // Valbar array av bekvämligheter
  hostName?: string; // Valbart namn för värd
};

// Typ för input när du skapar eller uppdaterar en lägenhet
type ApartmentInput = {
  title: string;
  description: string;
  bedrooms: number;
  beds: number;
  price: number;
  images: Id<"_storage">[]; // Array av bild-URL:er från _storage
  country: string;
  city: string;
  category?: 'offer' | 'popular' | null; // Valbar kategori för erbjudanden eller populära destinationer
  rating?: number; // Valbart betygsfält
  amenities?: string[]; // Valbar array av bekvämligheter
  hostName?: string; // Valbart namn för värd
};

// Typ för varje lägenhetsobjekt efter att ha hämtat dem från databasen
type ApartmentData = {
  _id: Id<"apartments">; // Convex-ID för varje lägenhet
  title: string;
  description: string;
  bedrooms: number;
  beds: number;
  price: number;
  images: string[]; // Array av bild-URL:er efter att ha hämtat från _storage
  country: string;
  city: string;
  category?: 'offer' | 'popular' | null; // Fält för att hantera kategorin
  createdAt?: Date;
  rating?: number; // Valbart betygsfält
  amenities?: string[]; // Valbar array av bekvämligheter
  hostName?: string; // Valbart namn för värd
};

// Typ för favoritdata, t.ex. användarens favoritlägenheter
type FavoriteData = {
  userId: string; // Användarens ID (från Clerk)
  apartmentId: Id<"apartments">; // Favoritlägenhetens ID
};

// Typ för att skapa en ny bokning
type BookingInput = {
  userId?: string; // Optional för anonym bokning
  apartmentId: Id<"apartments">;
  title: string;
  checkInDate: string;
  checkOutDate: string;
  totalGuests: number;
  pricePerNight: number;
  totalPrice: number;
  isAnonymous: boolean;
};

// Typ för bokningsdata efter hämtning från databasen
type BookingData = {
  _id: Id<"bookings">; // Convex-ID för bokningen
  userId?: string; // Optional om bokningen är anonym
  apartmentId: Id<"apartments">;
  title: string;
  checkInDate: string;
  checkOutDate: string;
  totalGuests: number;
  pricePerNight: number;
  totalPrice: number;
  bookingDate: string; // Datum för när bokningen skapades
  isAnonymous: boolean;
};
