import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  
  useremail:{
   type:String,
   required:[true,"email is required"],
   unique:[true," Account is created with this email id"]
  },
  name: {
    type: String,
    required: [true, "name is required"],
    
     
  },
  username: {
    type: String,
    required:[true , "username is required"],
    unique: [true, "This username is already taken please "],
    
  },
  bio: {
    type: String,
  },
  img: {
    type: String,
  },
  bgimg: {
    type: String,
  },
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
   
  
});

const User = models.User || model("User", UserSchema);

export default User;


