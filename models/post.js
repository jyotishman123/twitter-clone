import mongoose, { Schema, model, models } from 'mongoose';

const PostSchema = new Schema({
     
    createDateinmilisecond: {
        type: Date,
        default: Date.now,
      },
      text: {
        type: String,
        required: true,
      },
      image: {
        type: String, // This can be a URL pointing to the image or base64 data.
        default: null, // Optional field; set to null if not provided.
      },
      likes:{
        type:Array,
        default:[]
      },
      creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
      }
    });

 const Post  = models.Post || model("Post", PostSchema);
 export default Post;