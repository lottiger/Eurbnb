import React from 'react'
import Admin from './_components/admin'
import CreateForm from './_components/create-form'

function AdminPage() {
  return (
    <>
    <div>
        <Admin />
    </div>
    <div>
   <CreateForm />
    </div>
    </>
  )
}

export default AdminPage