'use client';
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import MobileLeftBar from './MobileLeftBar';
import MobileRightBar from './MobileRigthBar';

const Navbar = () => {
  const [showNav, setShowNav] = useState()
  return (
   <div> 
    <div className='block md:hidden py-4 px-5 mb-2 bg-slate-900 shadow-2xl'> 
  
    <div className='mx-6 flex justify-between items-center'>
        <MenuIcon onClick={()=>{setShowNav('left')}}/>
        <img src="/assets/twitter-logo.png" width={50} alt="" />
    </div>

    </div>
    <MobileLeftBar state={showNav} setChange={setShowNav}/>
    <MobileRightBar state={showNav} setChange={setShowNav}/>

    </div>
  )
}

export default Navbar