'use client'

import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import cache from "memory-cache";
import CloseIcon from '@mui/icons-material/Close';
 




const MobileRightBar =  ({state,setChange}) => {
    
  const [data, setData] = useState([])

  async function getData() {

    let url = `api/trendingtweets`;

    const cachedData = cache.get(url);

    if(cachedData){
      console.log("This is the data from client cached", cachedData)
       setData(cachedData.tweetData);
       return
    }

    let hours = 24
    try {
      const res = await fetch(url);
      const data = await res.json();
      cache.put(url,data, hours * 1000 * 60 *60)
      setData(data.tweetData);
    } catch (error) {
       setData([])
    }
  }

  useEffect(()=>{
     getData()
  },[])
  
  

  return (
    <div className=  {state === 'right' ? ( "  block md:hidden w-[100vh] p-6 basis-1/4 fixed z-50 bg-black  h-[100vh] left-0 top-0") : ("hidden")}>
        
    

      <div className="text-center">
        <h2 className="my-2 ml-2 py-2 font-bold text-2xl">Search</h2>
        <input
          type="text"
          placeholder="Search You Friend..."
          className="bg-slate-800  font-semibold py-2 pl-4 rounded-full"
          name=""
          id=""
        />
      </div>

      <div className="mt-6 mb-2 text-center pt-6 pb-3 ">
        <h2 className="text-2xl font-extrabold">Whats happening!</h2>
        <div className="bg-slate-800 w-fit p-4 rounded-full my-3 mx-auto">
            <CloseIcon onClick={()=>setChange()}/>
        </div>
      </div>

      <div className="h-[calc(100vh-260px)]  flex flex-wrap justify-center w-[100vw]  overflow-y-scroll overflow-x-hidden">


       {data.length === 0 && (
         <div className="flex items-center justify-center">
         <Loader/>
         </div>
       )}


        {data.length > 0 &&
          data.map((ele,index) => {
            return (
     
            <div key={index} className=" w-[250px]    bg-slate-900 rounded-lg py-3 px-4 text-sm my-4 mx-2  text-slate-400 font-semibold">
               <div>
                <img src={ele?.media_url} className="h-full w-full" alt="" />
                 
               </div>
                <p className="py-2">{ele?.text} </p>

     <a href={ele?.expanded_url} className="font-bold">GO TO THE POST</a>


            </div>
            
            
            
            )
          })}
      </div>
    </div>
  );
};

export default MobileRightBar;
