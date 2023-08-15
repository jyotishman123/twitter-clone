import User from "@/models/users";
import { connectToDB } from "@/utils/database";

export const POST = async (req,res) =>{
    try{
    // const user = await req.json()
    const user = await req.json();

        await connectToDB();
        console.log('db is connected')
        console.log({...user})

     
        const UserCreate = await User.create({...user})
        console.log("user is created")
        
        if(UserCreate){
            console.log("done")
            return new Response(JSON.stringify({userCreated:true,userDetails:UserCreate}))
        }else{
            return new Response(JSON.stringify({userCreated:false}))
        }

        
    }catch (error){
        return new Response(
            JSON.stringify({ error: error }),
            { status: 500 }
          );
    }
}