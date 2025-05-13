import { Schema, model } from "mongoose";

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            maxLength: [100, `Title can't exceed 100 characters`]
        },
        content: {
            type: String,
            required: [true, 'Content is required'],
            minLength: [20, "Content must be at least 20 characters"] 
        },
        course: {
            type: String,
            required: [true, 'Course is required'],
            enum: ['Course 1', 'Course 2', 'Course 3'],
            message: '{VALUE} is not a valid course'
        },
        bimestre: {
            type: String, 
            required: [true, 'Bimestre is required'],
            enum: ['Bimestre 1', 'Bimestre 2', 'Bimestre 3', 'Bimestre 4', 'Proyecto Final'],
        },
        githublink: {
            type: String, 
            required: true
        },
        createdAt: {
            type: Date, 
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
)

postSchema.methods.toJSON = function () {
    const { __v, ...post } = this.toObject()
    return post
}

export default model('Post', postSchema)