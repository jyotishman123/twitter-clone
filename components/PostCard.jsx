import React from 'react'
import { Avatar } from '@mui/material';
import PostButtons from './PostButtons';

const PostCard = ({postDetails}) => {
   // console.log(postDetails)
  return (
     <div className='   bg-slate-950    my-3 py-5 px-6 rounded-xl shadow-2xl'>
        <div className='flex'>
        <Avatar  sx={{ width:32, height: 32 }} alt="Remy Sharp" src={postDetails?.creator?.img} />
        <p className='mx-2 font-semibold text-slate-300'>@{postDetails?.creator?.username}</p>
        </div>
        <div className='my-4'>
          <p className='bg-slate-800 shadow-xl mx-6 px-2 py-2 rounded-lg'>
            {postDetails?.text}
          </p>
        </div>
        {postDetails?.image && (
           <div className='flex justify-center shadow-xl rounded-lg h-[250px]'>
            <img  className="w-full object-contain" loading='lazy'  src={postDetails?.image} alt="" />
           </div>
        )}
        <div>
<PostButtons post_id={postDetails?._id} likes={postDetails?.likes}/>
         </div>
     </div>
  )
}

export default PostCard