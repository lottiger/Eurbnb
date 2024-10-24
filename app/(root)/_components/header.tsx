'use client'
import { Menu } from 'lucide-react'
import React from 'react'
import DropdownMenu from './drop-down'
import SearchBar from './search-bar';


const Header = (): JSX.Element => {
  // Hantera sökresultat här
  const handleSearch = (destination: string, dates: string, guests: number) => {
    console.log('Söker efter:', destination, dates, guests);
    // Här kan du implementera söklogik, filtrering, eller routing baserat på sökresultaten
  };

  return (
    <div className='flex justify-between items-center py-[20px] px-[40px]'>
      <div className=''>
        <h1 className='text-[36px] text-[#FC4646]'>EurBNB</h1>
      </div>

      {/* Använd SearchBar-komponenten */}
      <SearchBar onSearch={handleSearch} />

      <DropdownMenu />
    </div>
  )
}

export default Header;
