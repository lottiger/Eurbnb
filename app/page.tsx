import React from 'react';
import Header from './(root)/_components/header';
import Offers from './(root)/_components/offers';
import PopularDestinations from './(root)/_components/popular-destinations';


function Page() {
  return (
    <div>
      <Header />
      <div className="apartment-list-container">
        {/* Rendera ApartmentList som nu hanterar dataladdningen */}
        <Offers />
        <PopularDestinations />
        
      </div>
    </div>
  );
}

export default Page;

