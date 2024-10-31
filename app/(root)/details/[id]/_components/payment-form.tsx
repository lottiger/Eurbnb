import React from 'react'

const PaymentForm = (): JSX.Element => {
  return (
   <>

     <h3 className='font-semibold text-[20px] text-center mb-2 mt-10'>Dina kontaktuppgifter</h3>
     <div className='flex justify-center items-center'>
     <form className='flex justify-center items-center flex-col w-[570px] gap-2'> {/* Container med maxbredd */}
       <div className='flex gap-2 w-full'>
         <input className='border rounded-md p-[8px] border-gray-500 flex-1' type="text" placeholder='Förnamn' />
         <input className='border rounded-md p-[8px] border-gray-500 flex-1' type="text" placeholder='Efternamn' />
       </div>
       <div className='w-full'>
         <input className='border rounded-md p-[8px] border-gray-500 w-full' type="text" placeholder='Adress' />
       </div>
       <div className='flex gap-2 w-full'>
         <input className='border rounded-md p-[8px] border-gray-500 flex-1' type="text" placeholder='Postnummer' />
         <input className='border rounded-md p-[8px] border-gray-500 flex-1' type="text" placeholder='Ort' />
       </div>
       <div className='w-full'>
         <input className='border rounded-md p-[8px] border-gray-500 w-full' type="text" placeholder='Mailadress' />
       </div>
       <div className='w-full'>
         <input className='border rounded-md p-[8px] border-gray-500 w-full' type="text" placeholder='Telefonnummer' />
       </div>
       <h4 className='font-semibold text-[20px] mb-2 mt-5'>Betalning</h4>
       <div className='w-full'>
         <input className='border rounded-md p-[8px] border-gray-500 w-full' type="text" placeholder='Kortnummer' />
       </div>
       <div className='flex gap-2 w-full'>
         <input className='border rounded-md p-[8px] border-gray-500 flex-1' type="text" placeholder='Datum' />
         <input className='border rounded-md p-[8px] border-gray-500 flex-1' type="text" placeholder='CVV' />
       </div>
       <button className='my-4 text-[16px] px-[20px] w-[355px] h-[46px] bg-[#1E3E62] text-white rounded-md hover:bg-[#2A4F7A]' type='submit'>Reservera och betala</button>
     </form>
     </div>
   </>
  )
}

export default PaymentForm
