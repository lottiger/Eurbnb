import React from 'react'
import BookingsList from './booking-list'
import HeaderWithoutSearch from '../_components/header-without-search'

function MyBookingsPage(): JSX.Element {
  return (
    <>
    <HeaderWithoutSearch />
    <h1 className='text-[40px] font-semibold'>Bokningshistorik</h1>
    <BookingsList />
    </>
  )
}

export default MyBookingsPage