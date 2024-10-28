import React, { useState, useEffect } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { ApartmentData } from '@/types/types';
import { Id } from '@/convex/_generated/dataModel';
import ApartmentCard from './apartment-card';

interface AllApartmentsProps {
  searchTerm: string;
}

const AllApartments: React.FC<AllApartmentsProps> = ({ searchTerm }) => {
  const apartments = useQuery(api.functions.apartments.getApartmentsWithImages) as ApartmentData[] | null;
  const [filteredApartments, setFilteredApartments] = useState<ApartmentData[]>([]);
  const [favoritedApartments, setFavoritedApartments] = useState<Id<"apartments">[]>([]);
  const [matchingCities, setMatchingCities] = useState<string[]>([]);

  useEffect(() => {
    if (apartments) {
      const filtered = apartments.filter(apartment =>
        apartment.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apartment.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredApartments(filtered);

      // Skapa en lista av unika städer för den aktuella sökningen
      const cities = Array.from(new Set(filtered.map(apartment => apartment.city)));
      setMatchingCities(cities);
    }
  }, [searchTerm, apartments]);

  const toggleFavorite = (apartmentId: Id<"apartments">) => {
    setFavoritedApartments(prev =>
      prev.includes(apartmentId)
        ? prev.filter(id => id !== apartmentId)
        : [...prev, apartmentId]
    );
  };

  if (!filteredApartments.length) return <div>Inga lägenheter hittades...</div>;

  return (
    <div className=''>
      <div className='mt-20 mx-36'>
      <p className=" mb-10 font-semibold text-[16px]">
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
            isFavorited={favoritedApartments.includes(apartment._id)}
            onToggleFavorite={() => toggleFavorite(apartment._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AllApartments;
