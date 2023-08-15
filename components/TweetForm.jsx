'use client'

import React, { useState, useRef } from 'react'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import {  blue } from '@mui/material/colors'
import {
  ref,
  uploadBytesResumable,
  getStorage,
  getDownloadURL,
  deleteObject
} from "firebase/storage";
import { app } from "@/firebase";

import { v4 as uuidv4 } from "uuid";
import ClearIcon from '@mui/icons-material/Clear';
import { useRouter } from "next/navigation";
import Loader from './Loader';


export const TweetForm = ({user_id}) => {
  const  router = useRouter()


   const [post,setPost] = useState({
    createDate:new Date().getTime(),
    text:"",
    image:null,
    likes:[],
    creator:user_id
   })

   
   const [camereOn, setCameraOn] = useState(false)
   const [uploading, setUploading] = useState(false)
   const [submiting,setSubmiting] = useState(false)

   const fileInputRef = useRef(null)
   

  function handleImageUpload(e){
    setUploading(true);
    let file = e.target.files[0];
    
    const storage = getStorage(app)
    const storageRef = ref(storage,uuidv4());
    const uploadTask = uploadBytesResumable(storageRef,file);

    uploadTask.on(
      "state_changed",
      (snapshot) =>{
        const progres = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error)=>{
        console.log(error);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
           setPost({...post,image:downloadURL})
           setUploading(false)
        })
      }
    )
    
  }

  function handleCameraClick(){
    setCameraOn(!camereOn)
    fileInputRef.current.click();
    
  }


 function deleteImg(){
  const storage = getStorage();

  // Create a reference to the file to delete
  const desertRef = ref(storage, post.image);
  
  // Delete the file
  deleteObject(desertRef).then(() => {
    // File deleted successfully
    setPost({...post,image:null})
  }).catch((error) => {
    // Uh-oh, an error occurred!
  });
 }

 async function submitPost(){
      if(uploading){
     alert("Image is Uploading....")
        return
      }

      

      try{
      setSubmiting(true)
     const res  =  await fetch("api/uploadpost",{
           method:"POST",
           headers:{
            "Content-Type": "application/json"
           },
           body: JSON.stringify(post)
        })
        
      // const data = await res.json()
       router.push('/')
       setSubmiting(false)


      
      } catch(error){
          console.log("this: , " , error);
          alert(error)
      } finally{

      }
      
 }

    

  return (
    <div className='mt-4'>
      {post.image && (
        <div className='relative my-3 w-[300px]'>
          
           <ClearIcon className='cursor-pointer'  onClick={deleteImg} color="primary"/>
           <br /><br />
        <div className='flex justify-center my-3   m-auto'> 
        <img src={post?.image} className='w-full object-contain m-auto ' alt="" loading='lazy' />
        </div>
        </div>
      )}
         <textarea   value={post.text} onChange={(e)=>setPost({...post,text:e.target.value})} className='w-full border focus:outline-0 p-4 text-white  rounded-lg bg-transparent  ' id="" cols="30" rows="10" placeholder='Your tweet....'></textarea>
         
         <div className='flex justify-between  items-center mt-6'> 



   {uploading ? (<Loader/>) : (

         <CameraAltOutlinedIcon    htmlFor="img" onClick={handleCameraClick}  className='mx-2 cursor-pointer'  sx={{
    color:  blue[500],
    fontSize: 30
  }}/>
  )}

  {/* <Loader/> */}

  <input type="file" ref={fileInputRef}  onChange={handleImageUpload} className='hidden' id='img' name='img' />

  {submiting ? (<Loader/>) :  (
         <button className='text-white mx-2 font-semibold bg-blue-500 py-2 px-6 rounded-full' onClick={submitPost}>Post</button>
         )}
         </div>
    
         <div>

         </div>
    </div>
  )
}
