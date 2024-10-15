type ClerkUser = {
    id: string;
    email?: string;
    isAdmin: boolean;
};

type Apartments = {
    id: string;
    titel: string;
    description: string;
    price: number;
    image: string;
    country: string;
    city: string;
    rating: number;
    createdAt?: Date;
};