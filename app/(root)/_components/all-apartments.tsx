'use client';
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { ApartmentData } from '@/types/types';
import { Id } from '@/convex/_generated/dataModel';
import ApartmentCard from './apartment-card';

interface AllApartmentsProps {
  searchTerm: string;
}

const AllApartments: React.FC<AllApartmentsProps> = ({ searchTerm }) => {
  const apartments = useQuery(api.functions.apartments.getApartmentsWithImages) as ApartmentData[] | null;
  const userFavorites = useQuery(api.functions.favorites.getUserFavorites) as ApartmentData[] | null;
  const toggleFavoriteMutation = useMutation(api.functions.favorites.toggleFavorite);

  const [filteredApartments, setFilteredApartments] = useState<ApartmentData[]>([]);
  const [favoritedApartments, setFavoritedApartments] = useState<Id<"apartments">[]>([]);
  const [matchingCities, setMatchingCities] = useState<string[]>([]);

  useEffect(() => {
    if (userFavorites) {
      // Extrahera ID:n från favoriterna och uppdatera `favoritedApartments`
      const favoriteIds = userFavorites.map(favorite => favorite._id);
      setFavoritedApartments(favoriteIds);
    }
  }, [userFavorites]);

  useEffect(() => {
    if (apartments) {
      const filtered = apartments.filter(apartment =>
        apartment.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apartment.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredApartments(filtered);

      const cities = Array.from(new Set(filtered.map(apartment => apartment.city)));
      setMatchingCities(cities);
    }
  }, [searchTerm, apartments]);

  const toggleFavorite = async (apartmentId: Id<"apartments">) => {
    try {
      await toggleFavoriteMutation({ apartmentId });
      setFavoritedApartments(prev =>
        prev.includes(apartmentId)
          ? prev.filter(id => id !== apartmentId)
          : [...prev, apartmentId]
      );
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  if (!filteredApartments.length) return <div>Inga lägenheter hittades...</div>;

  return (
    <div className=''>
      <div className=' mt-20 items-center text-center smx:flex mx-36 justify-start'>
        <p className="mb-10 font-semibold text-[16px]">
          {filteredApartments.length} {filteredApartments.length === 1 ? 'boende' : 'boenden'} 
          {matchingCities.length > 0 && (
            <> i {matchingCities.join(', ')}</>
          )}
        </p>
      </div>
      
      <div className="flex flex-wrap gap-[86px] justify-center mx-36">
        {filteredApartments.map(apartment => (
          <ApartmentCard
            key={apartment._id.toString()}
            apartmentId={apartment._id}
            title={apartment.title}
            description={apartment.description}
            bedrooms={apartment.bedrooms}
            beds={apartment.beds}
            price={apartment.price}
            images={apartment.images}
            rating={apartment.rating}
            isFavorited={favoritedApartments.includes(apartment._id)}
            onToggleFavorite={() => toggleFavorite(apartment._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AllApartments;
