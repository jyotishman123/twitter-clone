'use client'

import React from 'react'
import { signOut } from 'next-auth/react'

const SignOut = () => {
  return (
    <>
          <button  onClick={()=>{signOut()}} className="font-semibold text-xl rounded-3xl">Logout</button>
    
    </>
  )
}

export default SignOut