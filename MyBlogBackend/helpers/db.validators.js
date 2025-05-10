import Post from '../src/Posts/post.model.js'

// Verificar si la publicación existe
export const existPost = async (postId) => {
    const post = await Post.findById(postId)
    if (!post) {
        throw new Error('Post does not exist')
    }
}