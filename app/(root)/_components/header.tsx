import { Menu } from 'lucide-react'
import React from 'react'
import DropdownMenu from './drop-down'

const Header = () => {
  return (
    <div className='flex justify-between items-center p-4 h-[1280]'>
    <div className='flex-1'>
      {/* Lägg till andra element här om det behövs */}
    </div>
    <DropdownMenu />
  </div>
  )
}

export default Header