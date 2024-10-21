type ClerkUser = {
  id: string;
  email?: string;
  isAdmin: boolean;
};

// Typ för lägenheter som sparas i databasen
type Apartments = {
  id?: string;
  titel: string;
  description: string;
  bedrooms: number;
  beds: number;
  price: number;
  images: string;
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


// Props för ImagePicker-komponenten
interface ImagePickerProps {
  images?: string[]; // Uppdaterat till en array av bildkällor (src)
  setSelectedImages: (files: File[]) => void; // Hantering av valda bilder
  setImageSrcs: (srcs: string[]) => void; // Hantering av bilders källor (src)
}