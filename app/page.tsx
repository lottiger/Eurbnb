import React from 'react';
import Header from './(root)/_components/header';
import ApartmentList from './(root)/_components/apartment-list';

function Page() {
  return (
    <div>
      <Header />
      <div className="apartment-list-container">
        {/* Rendera ApartmentList som nu hanterar dataladdningen */}
        <ApartmentList />
      </div>
    </div>
  );
}

export default Page;

