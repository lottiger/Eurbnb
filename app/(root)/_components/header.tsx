import { Menu } from 'lucide-react'
import React from 'react'
import DropdownMenu from './drop-down'

const Header = (): JSX.Element => {
  return (
    <div className='flex justify-between items-center py-[20px] px-[40px]'>
    <div className=''>
        <h1 className='text-[36px] text-[#FC4646]'>EurBNB</h1>
    </div>
    <div className='shadow-md rounded-[50px] flex py-[11px] px-[34px] text-[14px] items-center'>
<div className='border-r border-[#E4E4E7]  px-[25px]'>
    <h2>Vart</h2>
    <p className='text-gray-500 pt-[10px]'>Sök destination</p>
</div>
<div className=' border-r border-[#E4E4E7] px-[25px]  '>
    <h2>När</h2>
    <p className='text-gray-500 pt-[10px]'>Lägg till datum</p>
</div>
<div className='px-[25px]  '>
    <h2>Antal</h2>
    <p className='text-gray-500 pt-[10px]'>Lägg till antal gäster</p>
</div>
<div className='pl-[25px] hover:cursor-pointer'>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M28.0001 26.586L20.4481 19.034C22.2629 16.8553 23.1679 14.0608 22.9748 11.2319C22.7817 8.40296 21.5054 5.75738 19.4114 3.84551C17.3173 1.93363 14.5669 0.902668 11.7321 0.96708C8.89729 1.03149 6.19647 2.18632 4.19146 4.19133C2.18644 6.19635 1.03161 8.89717 0.967202 11.732C0.90279 14.5667 1.93376 17.3172 3.84563 19.4112C5.75751 21.5052 8.40309 22.7816 11.232 22.9747C14.061 23.1678 16.8554 22.2628 19.0341 20.448L26.5861 28L28.0001 26.586ZM3.00012 12C3.00012 10.22 3.52796 8.4799 4.51689 6.99986C5.50582 5.51982 6.91143 4.36627 8.55596 3.68508C10.2005 3.00389 12.0101 2.82566 13.7559 3.17293C15.5018 3.52019 17.1054 4.37736 18.3641 5.63603C19.6227 6.89471 20.4799 8.49835 20.8272 10.2442C21.1745 11.99 20.9962 13.7996 20.315 15.4441C19.6338 17.0887 18.4803 18.4943 17.0002 19.4832C15.5202 20.4722 13.7801 21 12.0001 21C9.61398 20.9973 7.32633 20.0483 5.63908 18.361C3.95182 16.6738 3.00276 14.3861 3.00012 12Z" fill="black"/>
        </svg>
      </div>
    </div>
    <DropdownMenu />
  </div>
  )
}

export default Header