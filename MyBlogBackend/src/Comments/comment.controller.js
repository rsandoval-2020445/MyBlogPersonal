import Comment from './comment.model.js'

// Crear un comentario
export const createComment = async (req, res) => {
    try {
        const { author, content, postId } = req.body

        if (!author || !content || !postId) {
            return res.status(400).json({ success: false, message: 'All fields are required' })
        }

        const newComment = new Comment({ author, content, postId })
        await newComment.save()

        return res.status(201).json({ success: true, message: 'Comment created successfully', newComment })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: 'Error creating comment', error: err.message })
    }
}

// Obtener comentarios por publicación
export const getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.params

        const comments = await Comment.find({ postId }).sort({ createdAt: -1 })

        if (comments.length === 0) {
            return res.status(404).json({ success: false, message: 'No comments found for this post' })
        }

        return res.status(200).json({ success: true, message: 'Comments found', comments })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: 'Error retrieving comments', error: err.message })
    }
}
