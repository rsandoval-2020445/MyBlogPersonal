import { Schema, model} from "mongoose";

const commentSchema = new Schema(
    {
        author: {
            type: String, 
            required: [true, 'Author is required'],
            maxLength: [50, `Author can't exceed 50 characters`]
        },
        content: {
            type: String, 
            required: [true, 'Content is required'],
            minLength: [10, 'Content must be at least 10 characters']
        },
        postId: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            required: [true, 'Post ID is required']
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
)

commentSchema.methods.toJSON = function () {
    const { __v, ...comment } = this.toObject()
    return comment
  }
  
  export default model('Comment', commentSchema)