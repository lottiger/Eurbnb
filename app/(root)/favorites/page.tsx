'use client';

import React from 'react';
import FavoriteList from '../_components/favorites-list';
import HeaderWithoutSearch from '../_components/header-without-search';


const FavoritesPage = (): JSX.Element => {
  return (
    <>
    <HeaderWithoutSearch/>
      <h2 className="flex justify-center text-[40px] font-[600] mb-[36px] mt-[40px]">Favoriter</h2>
      <FavoriteList /> {/* Använd din nya FavoriteList-komponent */}
    </>
  );
};

export default FavoritesPage;
