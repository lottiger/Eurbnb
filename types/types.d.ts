type ClerkUser = {
    id: string;
    email?: string;
    isAdmin: boolean;
};

type Apartments = {
    id?: string;
    titel: string;
    description: string;
    badrooms: number;
    beds: number;
    price: number;
    images: { id: string; src: string }[];
    country: string;
    city: string;
    createdAt?: Date;
};

type ApartmentInput = {
    titel: string;
    description: string;
    bedrooms: number;
    beds: number;
    price: number;
    images: { id: string; src: string }[];
    country: string;
    city: string;
  }

interface ImagePickerProps {
    images: { id: string; src: string }[]; // Array av bilder med id och src
    setSelectedImages: (files: File[]) => void; // Funktion för att hantera valda bilder (flera)
    setImageSrcs: (srcs: string[]) => void; // Funktion för att hantera bilders källor (flera srcs)
  }
  
  