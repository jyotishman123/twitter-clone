
import React from 'react'
import { authOptions } from './api/auth/[...nextauth]/route'
import { getServerSession } from "next-auth/next"
import LeftBar from '@/components/LeftBar';
import MidBar from '@/components/MidBar';
import RightBar from '@/components/RightBar';

 


 

  const page = async () => {
  const session = await getServerSession(authOptions)
  
  return (
    
     <>
     <div className='text-white flex justify-center'> 
       
         <LeftBar userSession={session}/>
         <MidBar title={"Home"}/>
         <RightBar/>
         
     </div>
     </>
     
  )
}

export default page