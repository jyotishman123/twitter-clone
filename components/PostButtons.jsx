'use client'

import React, { useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotesOutlinedIcon from '@mui/icons-material/NotesOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useSession } from 'next-auth/react';
import {   red } from '@mui/material/colors'


const PostButtons = ({post_id, likes}) => {
  const {data:session} = useSession()
  // console.log(session)
  const [likeArray,setLikeArray] = useState(likes)
  
  async function likePost(){
     const response = await fetch(`api/postlike/${post_id}`,{
        method: 'PATCH',
        body:JSON.stringify({
           user_id:session?.user?.email
        })

     })
     const data = await response.json();
        setLikeArray(data.like)
       console.log(likeArray)
   }

 

  return (
     <div className='mt-5 mb-2   text-center borde'>
      <div className='flex   hover:border justify-around px-3 py-3 rounded-full bg-black items-center'> 
       
      
<div className='flex items-center'> 
   <p className='mx-2'>
     {likeArray?.length}
   </p>
      {likeArray?.includes(session?.user?.email)? <FavoriteIcon onClick={likePost} className='cursor-pointer' sx={{color:red[500]}}/> : <FavoriteBorderIcon onClick={likePost} className='cursor-pointer'/> }
</div>
      {/* <FavoriteBorderIcon className='cursor-pointer'  onClick={likePost} sx={{color:red[500]}} /> */}
       <NotesOutlinedIcon className='cursor-pointer'/>
      <StarBorderIcon className='cursor-pointer'/>
      </div>
     </div>
  )
}

export default PostButtons