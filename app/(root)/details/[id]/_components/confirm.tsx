import React from 'react'
import CheckIcon from './check-icon'
import HeaderWithoutSearch from '@/app/(root)/_components/header-without-search'

const Confirm = ():JSX.Element => {
  return (
    <>
    <HeaderWithoutSearch />
    <div className='flex justify-center items-center min-h-screen flex-col'>
        <div className='shadow-md px-24'>
            <div className='flex flex-col justify-center items-center'>
       <CheckIcon />
        <h1 className='text-[40px] font-semibold'>Din bokning genomfördes</h1>
        <p className='text-[24px] mb-20'>Bekräftelsen skickas till din epost</p>
        </div>
        </div>
    <div className='my-10 flex items-center justify-center gap-6'>
    <button className="mt-4 bg-[#1E3E62] text-white rounded-md py-3 px-16 text-[16px] hover:bg-[#2A4F7A]">
                Tillbaka till startsidan
              </button>
              <button className="mt-4 bg-[#1E3E62] text-white rounded-md py-3 px-20 text-[16px] hover:bg-[#2A4F7A]">
                Mina bokningar
              </button>
    </div>
        </div>
    
    </>
  )
}

export default Confirm