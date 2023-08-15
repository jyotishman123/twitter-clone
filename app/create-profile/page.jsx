"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { app } from "@/firebase";
import {
  ref,
  uploadBytesResumable,
  getStorage,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

const page = () => {
  const { data: session } = useSession();
  const  router = useRouter()
  

  const [filename, setFilename] = useState("Choose a File");
  const [progressbar, setProgressbar] = useState(0);
  const [submiting, setSubmiting] = useState(false);
  const [file,setFile] = useState(false)
  const [formerror, setFormerror] = useState()

  const [user, setUser] = useState({
    useremail: session?.user?.email || "",
    name: "",
    username: "",
    bio: "",
    img: "",
    bgimg: "",
    following: [],
    follower: [],
  });

  useEffect(() => {
    setUser({ ...user, useremail: session?.user?.email });
  }, [session]);

   function handleFileUpload(e) {
    setFile(true)
    let file = e.target.files[0];
    setFilename(e.target.files[0].name.slice(0, 7));

    const storage = getStorage(app);
    const storageRef = ref(storage, uuidv4());

    const uploadTask =   uploadBytesResumable(storageRef, file);

      uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progres = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgressbar(progres);
        

         
      },
      
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        setUser({ ...user, img: downloadURL });
        console.log(user)
        setFile(false)
        });
      }
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    if(file){
      alert("File is Uploading")
    setSubmiting(false);

      return
    }

    // if(user.name.trim.length === 0 && user.username.trim.length === 0){
    //   setFormerror({_message:"Enter username or name correctly"})
      
    //   return
    // }



     
    
    try {

      setSubmiting(true)
      const response = await fetch("api/createprofile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
         
      });
      const data = await response.json();
      
      console.log( response);
      console.log(data)
       if(data.error){
         setFormerror(data.error)
       }
      if(response.ok){
        router.push('/')
      }
      

    } catch (error) {
       console.log(error);
       setFormerror(error)
    } finally {
      setSubmiting(false)
    }
  }

  console.log("this is " + formerror)

  return (
    <div className="h-[100vh]">
      {file ?  <div className="text-white fixed top-2 z-10 left-2 bg-red-500 m-3 rounded-lg w-fit py-3 px-6">
        <h1 className="font-semibold ">File is Uploading  {progressbar}</h1>
      </div>: " "}
     
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-opacity-25 bg-black backdrop-filter backdrop-blur-lg rounded p-8 shadow-lg text-white">
          <div className="m-3 flex justify-center">
            <Image
              src={"/assets/twitter-logo.png"}
              alt="logo"
              width={60}
              height={60}
            />
          </div>
          {formerror ? <div className="text-white text-center rounded-lg bg-red-500 m-2 p-1  border-2 border-red-700">
            <p>{formerror._message || "username is taken already"}</p>
          </div> : "" }
          
          <h2 className="text-3xl font-extrabold text-center mb-8">
            Create Your Profile on Twitter
          </h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={user.name}
                onChange={(e) => {
                  setUser({ ...user, name: e.target.value });
                }}
                className="mt-1 px-4 py-2 block w-full rounded-md bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={user.username}
                onChange={(e) => {
                  setUser({ ...user, username: e.target.value });
                }}
                className="mt-1 px-4 py-2 block w-full rounded-md bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label htmlFor="bio" className="text-sm font-medium">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                required
                value={user.bio}
                onChange={(e) => {
                  setUser({ ...user, bio: e.target.value });
                }}
                className="mt-1 px-4 py-2 block w-full rounded-md bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your bio"
                rows="3"
              />
            </div>
            <div>
              <label htmlFor="avatar" className="text-sm font-medium">
                Avatar:  {progressbar ? ` Uploading ${progressbar}` : "Select a file"}
              </label>
              <div className="mt-1 flex justify-center items-center">
                <label className="py-2 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-md cursor-pointer">
                  <span className="text-white">{filename}</span>

                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="avatar"
                    name="avatar"
                  />
                </label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 text-sm font-medium rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                onClick={handleSubmit}
              >
               {submiting ? "Creating your Profile..." : "Create Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
