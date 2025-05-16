import Post from './post.model.js'

// Crear una publicación
export const createPost = async (req, res) => {
    try {
        const { title, content, course, bimestre, githublink } = req.body

        if (!title || !content || !course || !bimestre || !githublink) {
            return res.status(400).json({ success: false, message: 'All fields are required' })
        }

        const newPost = new Post({ title, content, course, bimestre, githublink })
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
    const course = decodeURIComponent(req.params.course).trim() // Elimina espacios y decodifica
    console.log(`Filtrando posts para el curso: "${course}"`) // Log para depuración
    const posts = await Post.find({ course: course }) // Filtra exactamente por 'course'
    console.log(`Posts encontrados para ${course}: ${posts.length}`) // Log para confirmar
    res.status(200).json({ posts })
  } catch (error) {
    console.error('Error fetching posts by course:', error)
    res.status(500).json({ success: false, message: 'Error fetching posts by course', error: error.message })
  }
}

// Nueva función: Obtener publicaciones por bimestre
export const getPostsByBimestre = async (req, res) => {
    try {
        const { bimestre } = req.params
        const posts = await Post.find({ bimestre }).sort({ createdAt: -1 })

        if (posts.length === 0) {
            return res.status(404).json({ success: false, message: 'No posts found for this bimestre' })
        }

        return res.status(200).json({ success: true, message: 'Posts found', posts })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: 'Error retrieving posts by bimestre', error: err.message })
    }
}

// Actualizar una publicación
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params
    const postData = req.body

    // Validar que al menos un campo se esté actualizando
    if (Object.keys(postData).length === 0) {
      return res.status(400).json({ success: false, message: 'No data provided to update' })
    }

    // Permitir la actualización de createdAt explícitamente
    const post = await Post.findByIdAndUpdate(id, { ...postData, updatedAt: Date.now() }, {
      new: true,
      runValidators: true,
      overwrite: false, // Evita sobrescribir todo el documento
    })

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' })
    }

    res.status(200).json({ success: true, message: 'Post updated successfully', post })
  } catch (error) {
    console.error('Error updating post:', error)
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message })
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