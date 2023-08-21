'use client'

import React, { useEffect, useState } from 'react'
import ArrowDownwardIcon from '@mui/icons-material/ArrowUpward';
import PostCard from './PostCard';
import Loader from './Loader';


const MidBar = ({title}) => {
  
  const [allPost,setAllPost] = useState();
  

  const getPost = async () =>{
let datas = null
    try{
      const response = await fetch('api/getposts',{cache:'no-store'});
      const postData = await response.json();
      setAllPost(postData.allposts)
      datas = postData;
      console.log("this", datas)
      
    } catch (error){
      console.log("There is an ", error)
    }
  }

  useEffect(()=>{
      getPost()
  },[])


 

  return (
    <div className=' basis-1/2 border-r border-slate-800  py-3'>
      <div className='sticky top-0  border-b border-slate-800  z-20 backdrop-blur'> 
      <div className='py-2 px-4 '>
        <h1 className='text-xl font-bold'>{title}</h1>
      </div>
      <div className='text-center py-5 flex justify-center items-center'>
        <button className='bg-blue-500 text-lg font-bold py-2 px-5 rounded-full'>tweets</button>
        <ArrowDownwardIcon className='mx-2'/>
        
      </div>
      </div>
      <div className=' my-6 py-6 px-5'>
       {!allPost && (
         <div className='flex justify-center'>
          <br />
         <Loader/>
         </div>
       )}
       
       {allPost?.map((posts, index)=>{
         return(<PostCard key={index} postDetails={posts}/>)
       })}
      </div>
    </div>
  )
}

export default MidBar