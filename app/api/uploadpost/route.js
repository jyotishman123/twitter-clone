import Post from "@/models/post";
import { connectToDB } from "@/utils/database";


export const POST =  async (req)=>{
    
    try{
        const request = await req.json();
        await connectToDB();
        const newPost = new Post({...request})
        await newPost.save();
        return new Response(JSON.stringify({'sucess':true,post:'created'}))
    } catch(error){
        return new Response(error)
    }

    
     
}
 