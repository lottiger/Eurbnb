
'use client'

import React, { useState } from 'react';
import Header from './(root)/_components/header';
import Offers from './(root)/_components/offers';
import PopularDestinations from './(root)/_components/popular-destinations';
import AllApartments from './(root)/_components/all-apartments'; // Importera AllApartments


function Page() {
  const [searchTerm, setSearchTerm] = useState<string>(''); // State för söktermen

  // Funktion för att uppdatera söktermen från Header
  const handleSearch = (destination: string) => {
    setSearchTerm(destination);
  };

  return (
    <div>
      {/* Skicka handleSearch som prop till Header */}
      <Header onSearch={handleSearch} />
      
      <div className="apartment-list-container">
    
        {/* Visa AllApartments när en sökterm finns */}
        {searchTerm ? (
          <AllApartments searchTerm={searchTerm} />
        ) : (
          <>
            <Offers />
            <PopularDestinations />
          </>
        )}
      </div>
    </div>
  );
}

export default Page;
