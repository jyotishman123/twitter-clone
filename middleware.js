
import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
 
 


export default async function middleware(req) {
  const session = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  }); 
  
 
   

  if(!session && !req.nextUrl.pathname.startsWith('/login') ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
 else if(session && req.nextUrl.pathname.startsWith('/login')){
    return NextResponse.redirect(new URL("/", req.url))
     
  }
  else if (!session && req.nextUrl.pathname === '/login') {
    // This block handles the case where a user is already on the login page but not authenticated.
    // You can add custom logic here if needed.
    return;
  } else if (!session && req.nextUrl.pathname.startsWith('/create-profile')) {
    // This block handles the case where a user is on the create-profile page but not authenticated.
    // You can add custom logic here if needed.
    return;
  }



  // const userDetails = await fetch(`${process.env.NEXTAUTH_URL}/api/checkuser/${session?.email}`,{cache:'no-store'})
  // const data = await userDetails.json();
  // console.log("This is from middleware", data)

let data = null;

 

 

if (session) {
  try {
    const userDetailsResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/checkuser/${session?.email}`);

    if (userDetailsResponse.ok) {
      data = await userDetailsResponse.json();
    } else {
      // Handle non-OK response, e.g., show an error page or redirect
      console.error('User details fetch failed:', userDetailsResponse.status, userDetailsResponse.statusText);
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
  }
}
 
  
  if(!data?.user && !req.nextUrl.pathname.startsWith('/create-profile')){
     return NextResponse.redirect(new URL("/create-profile", req.url))
  }
  else if(data?.user && req.nextUrl.pathname.startsWith('/create-profile')){
     return NextResponse.redirect(new URL("/", req.url))
  }

 
 

}
export const config = {
  matcher:["/",'/login','/create-profile','/new-tweet','/api/checkuser'],
  api: {
    bodyParser: false,  // Disable built-in bodyParser
  },
};
