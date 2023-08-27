import Image from "next/image";
import Link from "next/link";
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import PeopleIcon from '@mui/icons-material/People';
import Avatar from '@mui/material/Avatar';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import SignOut from "./SignOut";
 


const LeftBar = async ({ userSession}) => {
 
  
const res = await fetch(`${process.env.NEXTAUTH_URL}/api/checkuser/${userSession?.user?.email}`);
const data = await res.json();
const user = data.usersDetails;
const res2 = await fetch(`${process.env.NEXTAUTH_URL}/api/getposts`);




  
  return(
    <div className="  hidden md:block basis-1/4 sticky left-0 top-0  border-r border-slate-800 h-[100vh] p-6">
        <div className="flex justify-center">
           <Image src={"/assets/twitter-logo.png"} height={60} width={60}/> 
        </div>
        <div className="flex justify-center my-6 py-3 px-4 text-left">
          <nav>
            <div className="my-5 py-2 font-semibold text-2xl">
              <div className="flex items-center"> 
              <HomeIcon className="mx-2"/>
             <Link href={"/"}>
                   Home
             </Link>
             </div>
            </div>
             <div className="my-3 py-3 font-semibold text-2xl">
              <div className="flex items-center"> 
              <ListIcon className="mx-2"/>
             <Link href={"/"}>
                   Lists
             </Link>
             </div>
            </div>  
             <div className="my-3 py-3 font-semibold text-2xl">
              <div className="flex items-center"> 
              <PeopleIcon className="mx-2"/>
             <Link href={"/"}>
                    Profile
             </Link>
             </div>
            </div>
          </nav>
        </div>

        <div className=" my-1 flex justify-center">
          <Link href={"/new-tweet"}> 
          <button className="bg-blue-500 py-3 px-[50px] font-semibold text-xl rounded-3xl">Tweet</button>
          </Link>
        </div>

        <div className="mt-3 flex justify-center">
            
            <SignOut/>
          
        </div>


        

        <div className="mt-6 flex items-center justify-between">
          <div className=" cursor-pointer flex   py-3 justify-center items-center rounded-xl">
            <div className="mx-1"> 
          <Avatar  sx={{ width: 56, height: 56 }} alt="Remy Sharp" src={user?.img} />
          </div>

          <div className="mx-1">
             <h2 className="font-semibold text-xl">{user?.name}</h2>
             <h3 className="text-slate-500 text-lg">@{user?.username}</h3>
          </div>

         
            
          </div>
         
          <div className="cursor-pointer">
              <LinearScaleIcon/>
          </div>
           
        </div>
    </div>
  )
}

export default LeftBar;


