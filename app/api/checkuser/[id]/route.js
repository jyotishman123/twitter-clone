import User from "@/models/users";
import { connectToDB } from "@/utils/database";

export const revalidate = 0;
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

   
    let userCreated = await User.findOne({
         useremail:  params.id
    });
    if (userCreated) {
      return new Response(JSON.stringify({ user: true, usersDetails:userCreated }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ user: false }));
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};


