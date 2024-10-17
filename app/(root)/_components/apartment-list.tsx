
import React from 'react'




const ApartmentList = (): JSX.Element => {
  return (
    <div className='bg-red-200 w-[200px] h-[238px] text-[12px]'>
        <div className='h-[160px] bg bg-red-300 rounded-[10px]'>
<p>bild</p>
        </div>
        
<div className='flex justify-between font-semibold'>
    <h3 className=''>
        Lägenhet på Östermalm
    </h3>
    <div className='flex items-center'>
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.9125 11L3.725 7.4875L1 5.125L4.6 4.8125L6 1.5L7.4 4.8125L11 5.125L8.275 7.4875L9.0875 11L6 9.1375L2.9125 11Z" fill="#1D1B20"/>
</svg>
<p>4.8</p>
</div>
</div>
<div className='flex items-center gap-2 text-gray-600'>
<p>2 sovrum </p>
<svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="2.5271" cy="2.5" r="2.5" fill="black" fill-opacity="0.8"/>
</svg>
<p>5 sängar</p>
</div>
<div className='pt-3'>
    <p className='font-medium'>1088kr/natt</p>
</div>
    </div>
  )
}

export default ApartmentList