
import React from 'react'
import { authOptions } from './api/auth/[...nextauth]/route'
import { getServerSession } from "next-auth/next"
import LeftBar from '@/components/LeftBar';
import MidBar from '@/components/MidBar';
import RightBar from '@/components/RightBar';
import Navbar from '@/components/Navbar';

 


 

  const page = async () => {
  const session = await getServerSession(authOptions)
  
  return (
    
     <>
     <div className='text-white md:flex block justify-center'> 
       

          <Navbar/>
         <LeftBar userSession={session}/>
         <MidBar title={"Home"}/>
         <RightBar/>
         
     </div>
     </>
     
  )
}

export default page