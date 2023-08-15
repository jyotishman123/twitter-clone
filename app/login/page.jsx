'use client'

import React,{useState,useEffect} from "react";
import Image from "next/image";
import {signIn, getProviders} from "next-auth/react"
 


 
const Login = () => {

  const [provider, setProvider] = useState()
  
   function handleSignIn(){
        // signIn()
        console.log(getProviders())

        
   }

    useEffect(()=>{
        getProviders()
        .then((res)=>{
          setProvider(res)
        })

       
      
        
    },[])
     
 

  return (
    <div className="h-[100vh]  flex justify-center align-middle items-center flex-col">
      <div className="m-6 ">
        <Image
          src={"/assets/twitter-logo.png"}
          alt="logo"
          width={220}
          height={190}
        />
      </div>
      <div>
        <p>
          
        </p>
      </div>
      <div className="m-6">
       {provider && Object.values(provider).map((provider,index)=>{
         return(
            <div key={index} className="bg-white rounded-md flex cursor-pointer items-center hover:bg-transparent hover:text-white hover:border-2  px-6 py-3">


              <div className="mx-3"> 
              <Image src= {'https://authjs.dev/img/providers/google.svg'} width={30} height={30} alt="google_logo"/> 
              </div>

              <div className="font-semibold text-lg mx-3">
                <button onClick={()=>{signIn(provider.id)}}>Sign with Google</button>
              </div>
            </div>
         )
       })}
      </div>
    </div>
  );
};

export default Login;


 