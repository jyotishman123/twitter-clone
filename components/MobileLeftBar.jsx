"use client";

import Image from "next/image";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import PeopleIcon from "@mui/icons-material/People";
import Avatar from "@mui/material/Avatar";
import SignOut from "./SignOut";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import CloseIcon from "@mui/icons-material/Close";

const MobileLeftBar = ({state,setChange}) => {
  const { data: session } = useSession();

  const [user, setUser] = useState();

  useEffect(() => {
    async function getUser() {
      const res = await fetch(`/api/checkuser/${session?.user?.email}`);
      const data = await res.json();
      // console.log(session)
      setUser(data.usersDetails);
    }
    getUser();
  }, [session]);

  return (
    <div className=   {state === 'left' ? ("block md:hidden fixed left-0 w-[100vw] top-0 z-50 border-r bg-black h-[100vh] p-6") : ('hidden')}>
      <div className="flex justify-center">
        <Image src={"/assets/twitter-logo.png"} height={60} width={60} />
      </div>
      <div className="flex justify-center my-6 py-3 px-4 text-left">
        <nav>
          <div className="my-5 py-2 font-semibold text-2xl">
            <div className="flex items-center" onClick={()=>setChange()}>
              <HomeIcon className="mx-2" />
              <Link href={"/"}>Home</Link>
            </div>
          </div>
          <div className="my-3 py-3 font-semibold text-2xl">
            <div className="flex items-center" onClick={()=>{setChange('right')}}>
              <ListIcon className="mx-2" />
              <Link href={"/"}>Lists</Link>
            </div>
          </div>
          <div className="my-3 py-3 font-semibold text-2xl">
            <div className="flex items-center" onClick={()=>setChange()}>
              <PeopleIcon className="mx-2" />
              <Link href={"/"}>Profile</Link>
            </div>
          </div>
        </nav>
      </div>

      <div className=" my-1 flex justify-center">
        <Link href={"/new-tweet"}>
          <button className="bg-blue-500 py-3 px-[50px] font-semibold text-xl rounded-3xl">
            Tweet
          </button>
        </Link>
      </div>

      <div className="mt-3 flex justify-center">
        <SignOut />
      </div>

      <div className="mt-6 flex items-center justify-center my-3">
        <div className=" cursor-pointer flex   py-3 justify-center items-center rounded-xl">
          <div className="mx-1">
            <Avatar
              sx={{ width: 56, height: 56 }}
              alt="Remy Sharp"
              src={user?.img}
            />
          </div>

          <div className="mx-1">
            <h2 className="font-semibold text-xl">{user?.name}</h2>
            <h3 className="text-slate-500 text-lg">@{user?.username}</h3>
          </div>
        </div>
      </div>
      <div className="bg-slate-800  py-2 px-2 rounded-full w-fit m-auto">
        <CloseIcon onClick={()=>{setChange()}} />
      </div>
    </div>
  );
};

export default MobileLeftBar;
