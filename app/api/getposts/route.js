import Post from "@/models/post";
import { connectToDB } from "@/utils/database";

export const revalidate = 0
export const GET = async (req)=>{
    try{
         await connectToDB();
         
         const post = await Post.find({}).populate('creator')
         return new Response(JSON.stringify({sucess:true,allposts:post}))
     } catch(error){
        return new Response(JSON.stringify({error:"This is the error", error}))
     }

}