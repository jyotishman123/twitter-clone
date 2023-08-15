import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { getServerSession } from "next-auth/next"
import { Avatar } from '@mui/material';
import { TweetForm } from '@/components/TweetForm';


export const fetchCache = 'force-no-store';
const page = async () => {
  const session = await getServerSession(authOptions) 
   
  const  response = await fetch(`${process.env.NEXTAUTH_URL}/api/checkuser/${session?.user?.email}`)
  const  data = await response.json();
 
  
  return (
     <div>
    
        <div className='text-center'>
          <h1 className='text-white text-4xl font-bold my-8'>Post a tweet 👍 </h1>
                <div className='text-white'>{new Date().getTime()}</div>
        </div>


        <div className=' rounded-lg    w-[40%] mx-auto my-[10%] px-6 py-6'>
           <div className='flex items-center'>
          <Avatar className='mx-2' sx={{ width: 56, height: 56 }} alt="Remy Sharp" src={data.usersDetails.img} />
             <div className=' mx-2'> 
              <h2 className='text-white  font-bold text-xl'>{data.usersDetails.name}</h2>
              <h3 className='text-slate-500 font-semibold'>@{data.usersDetails.username}</h3>
            </div>
           </div>

    <div className='my-3'>
    <TweetForm user_id={data?.usersDetails?._id}/>
    </div>

        </div>
     </div>
  )
}

export default page