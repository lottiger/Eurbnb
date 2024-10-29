// ApartmentCard.tsx
import React, { useState } from 'react';
import ImageCarousel from './image-carousel';
import FavoriteButton from './favorites-button';
import { Id } from '@/convex/_generated/dataModel';
import AuthModal from './auth-modal';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

type ApartmentCardProps = {
  apartmentId: Id<"apartments">;
  title: string;
  description: string;
  bedrooms: number;
  beds: number;
  price: number;
  images: string[];
  rating?: number;
  isFavorited: boolean;
  onToggleFavorite: () => void;
};

const ApartmentCard = ({
  apartmentId,
  title,
  description,
  bedrooms,
  beds,
  price,
  images,
  rating,
  isFavorited,
  onToggleFavorite,
}: ApartmentCardProps): JSX.Element => {
  const { isSignedIn } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter(); // Använd router för navigering

  const handleFavoriteClick = () => {
    if (isSignedIn) {
      onToggleFavorite();
    } else {
      setModalOpen(true);
    }
  };

  // Hantera klick på titeln för navigering till detailsidan
  const handleTitleClick = () => {
    router.push(`/details/${apartmentId.toString()}`);
  };

  return (
    <div className="relative p-2 rounded-lg mb-4 w-[200px] text-[12px]">
      <ImageCarousel images={images} />

      <FavoriteButton isFavorited={isFavorited} onToggle={handleFavoriteClick} />

      <div className="flex justify-between font-semibold mt-2">
        {/* Navigera till detaljsidan när man klickar på titeln */}
        <h3 className="cursor-pointer hover:underline" onClick={handleTitleClick}>
          {title}
        </h3>
        <div className="flex items-center">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.9125 11L3.725 7.4875L1 5.125L4.6 4.8125L6 1.5L7.4 4.8125L11 5.125L8.275 7.4875L9.0875 11L6 9.1375L2.9125 11Z" fill="#1D1B20" />
          </svg>
          <p>{rating}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-gray-600">
        <p>{bedrooms} sovrum</p>
        <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="2.5271" cy="2.5" r="2.5" fill="black" fillOpacity="0.8" />
        </svg>
        <p>{beds} sängar</p>
      </div>

      <div className="pt-3">
        <p className="font-medium">{price} kr/natt</p>
      </div>

      {/* Modal för inloggningsbehov */}
      <AuthModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default ApartmentCard;
