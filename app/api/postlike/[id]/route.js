import Post from "@/models/post";
import { connectToDB } from "@/utils/database";

export const PATCH = async (request, { params }) => {
  const { user_id } = await request.json();

  try {
    await connectToDB();
    console.log("This is ", user_id);

    const post = await Post.findById(params.id);

    if (post.likes.includes(user_id)) {
      // If user_id is in the likes array, remove it
      const update = post.likes.filter((ele) => {
        return ele !== user_id;
      });

      post.likes = update;
    } else {
      // If user_id is not in the likes array, add it
      post.likes.push(user_id);

      await post.save();

      return new Response(JSON.stringify({ like: post.likes }));
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error }));
  }
};
