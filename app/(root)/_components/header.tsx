// Header.tsx
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import DropdownMenu from './drop-down';
import SearchBar from './search-bar';

interface HeaderProps {
  onSearch: (destination: string, dates: string, guests: number) => void; // Uppdatera typen här
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const router = useRouter();

  const handleTitleClick = () => {
    router.push('/');
  };

  return (
    <div className="items-center smx:flex justify-between py-[20px] px-[40px]">
      <div>
        <h1
          className="flex justify-center items-center text-[36px] text-[#FC4646] cursor-pointer"
          onClick={handleTitleClick}
        >
          EurBNB
        </h1>
      </div>
      <SearchBar onSearch={onSearch} /> {/* Skicka onSearch till SearchBar */}
      <div className="flex items-center justify-center mt-2">
        <DropdownMenu />
      </div>
    </div>
  );
};

export default Header;
