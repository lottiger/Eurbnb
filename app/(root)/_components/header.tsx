// Header.tsx
'use client'
import React from 'react';
import DropdownMenu from './drop-down';
import SearchBar from './search-bar';

interface HeaderProps {
  onSearch: (destination: string) => void; // Prop för att hantera söktermen
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <div className='flex justify-between items-center py-[20px] px-[40px]'>
      <div>
        <h1 className='text-[36px] text-[#FC4646]'>EurBNB</h1>
      </div>
      <SearchBar onSearch={onSearch} /> {/* Skicka onSearch till SearchBar */}
      <DropdownMenu />
    </div>
  );
};

export default Header;
