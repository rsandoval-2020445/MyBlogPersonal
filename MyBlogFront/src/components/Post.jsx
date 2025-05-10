import { useState, useEffect } from 'react'
import axios from 'axios'

const Post = ({ post }) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState({ author: '', content: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3626/api/comments/${post._id}`)
        setComments(response.data.comments || [])
      } catch (error) {
        console.error('Error fetching comments:', error)
      }
    }
    fetchComments()
  }, [post._id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.author || !newComment.content) {
      alert('Por favor, completa todos los campos.')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await axios.post('http://localhost:3626/api/comments', {
        author: newComment.author,
        content: newComment.content,
        postId: post._id,
      })
      setComments([response.data.newComment, ...comments])
      setNewComment({ author: '', content: '' })
    } catch (error) {
      console.error('Error adding comment:', error)
      alert('Error al añadir el comentario.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <div className="post-meta">
        <p><strong>Curso:</strong> {post.course}</p>
        <p><strong>Fecha:</strong> {new Date(post.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
      </div>

      {/* Lista de comentarios */}
      <div className="comments-section">
        <h3>Comentarios</h3>
        {comments.length === 0 ? (
          <p className="no-comments">No hay comentarios aún. ¡Sé el primero en comentar!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="comment">
              <p className="comment-meta">{comment.author} <span>({new Date(comment.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })})</span></p>
              <p>{comment.content}</p>
            </div>
          ))
        )}
      </div>

      {/* Formulario para añadir comentario */}
      <div className="form-section">
        <h3>Añadir Comentario</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tu nombre"
            value={newComment.author}
            onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
            disabled={isSubmitting}
          />
          <textarea
            placeholder="Escribe tu comentario"
            value={newComment.content}
            onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
            disabled={isSubmitting}
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Post