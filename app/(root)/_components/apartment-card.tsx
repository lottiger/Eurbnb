// ApartmentCard.tsx
import React from 'react';
import { Id } from '@/convex/_generated/dataModel';
import ApartmentImage from './apartment-image'; // Bildkomponenten, om du har en separat komponent för att hantera bilder

interface ApartmentCardProps {
  apartmentId: Id<"apartments">;
  title: string;
  description: string;
  bedrooms: number;
  beds: number;
  price: number;
  images: string[];
  isFavorited: boolean;
  onToggleFavorite: () => void;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({
  apartmentId,
  title,
  description,
  bedrooms,
  beds,
  price,
  images,
  isFavorited,
  onToggleFavorite,
}) => (
  <div className="p-2 rounded-lg mb-4">
    <div className="w-[200px] text-[12px]">
      <ApartmentImage
        apartmentId={apartmentId}
        images={images}
        isFavorited={isFavorited}
        onToggleFavorite={onToggleFavorite}
      />
      <div className="flex justify-between font-semibold mt-2">
        <h3>{title}</h3>
        <div className="flex items-center">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.9125 11L3.725 7.4875L1 5.125L4.6 4.8125L6 1.5L7.4 4.8125L11 5.125L8.275 7.4875L9.0875 11L6 9.1375L2.9125 11Z"
              fill="#1D1B20"
            />
          </svg>
          <p>4.8</p> {/* Dynamisk rating om det finns */}
        </div>
      </div>

      <div className="flex items-center gap-2 text-gray-600">
        <p>{bedrooms} sovrum</p>
        <svg
          width="6"
          height="5"
          viewBox="0 0 6 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="2.5271" cy="2.5" r="2.5" fill="black" fillOpacity="0.8" />
        </svg>
        <p>{beds} sängar</p>
      </div>

      <div className="pt-3">
        <p className="font-medium">{price} kr/natt</p>
      </div>
    </div>
  </div>
);

export default ApartmentCard;
