import Post from './post.model.js'

// Crear una publicación
export const createPost = async (req, res) => {
    try {
        const { title, content, course } = req.body

        if (!title || !content || !course) {
            return res.status(400).json({ success: false, message: 'All fields are required' })
        }

        const newPost = new Post({ title, content, course })
        await newPost.save()

        return res.status(201).json({ success: true, message: 'Post created successfully', newPost })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: 'Error creating post', error: err.message })
    }
}

// Obtener todas las publicaciones
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 })

        if (posts.length === 0) {
            return res.status(404).json({ success: false, message: 'No posts found' })
        }

        return res.status(200).json({ success: true, message: 'Posts found', posts })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: 'Error retrieving posts', error: err.message })
    }
}

// Obtener una publicación por ID
export const getPostById = async (req, res) => {
    try {
        const { id } = req.params
        const post = await Post.findById(id)

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' })
        }

        return res.status(200).json({ success: true, message: 'Post found', post })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: 'Error retrieving post', error: err.message })
    }
}

// Obtener publicaciones por curso
export const getPostsByCourse = async (req, res) => {
    try {
        const { course } = req.params
        const posts = await Post.find({ course }).sort({ createdAt: -1 })

        if (posts.length === 0) {
            return res.status(404).json({ success: false, message: 'No posts found for this course' })
        }

        return res.status(200).json({ success: true, message: 'Posts found', posts })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: 'Error retrieving posts', error: err.message })
    }
}

// Actualizar una publicación
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params
        const { title, content, course } = req.body

        if (!title || !content || !course) {
            return res.status(400).json({ success: false, message: 'All fields are required' })
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { title, content, course, updatedAt: Date.now() }, // Actualiza manualmente
            { new: true }
        )

        if (!updatedPost) {
            return res.status(404).json({ success: false, message: 'Post not found' })
        }

        return res.status(200).json({ success: true, message: 'Post updated successfully', updatedPost })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: 'Error updating post', error: err.message })
    }
}

// Eliminar una publicación
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params

        const deletedPost = await Post.findByIdAndDelete(id)

        if (!deletedPost) {
            return res.status(404).json({ success: false, message: 'Post not found' })
        }

        return res.status(200).json({ success: true, message: 'Post deleted successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: 'Error deleting post', error: err.message })
    }
}
