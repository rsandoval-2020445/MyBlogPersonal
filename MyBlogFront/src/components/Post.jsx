import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Post = ({ post }) => {
  const [commentText, setCommentText] = useState('')
  const [commentAuthor, setCommentAuthor] = useState('')
  const [comments, setComments] = useState([])

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3626/api/comments/${post._id}`)
        if (response.data.success) {
          setComments(response.data.comments)
        }
      } catch (error) {
        console.error('Error fetching comments:', error)
      }
    }
    fetchComments()
  }, [post._id])

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (commentText.trim() && commentAuthor.trim()) {
      try {
        const response = await axios.post('http://localhost:3626/api/comments/', {
          author: commentAuthor,
          content: commentText,
          postId: post._id,
        })

        if (response.data.success) {
          setComments([...comments, response.data.newComment])
          setCommentText('')
          setCommentAuthor('')
        }
      } catch (error) {
        console.error('Error adding comment:', error)
        alert('Hubo un error al agregar el comentario. Por favor, intenta de nuevo.')
      }
    }
  }

  // Formatear la fecha para mostrar solo día, mes y año
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <div className="post" style={{ 
      backgroundColor: '#fff', 
      borderRadius: '8px', 
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
      padding: '15px', 
      transition: 'transform 0.2s'
    }}
    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
      <div className="post-content">
        <div className="post-meta" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          color: '#7F858D',
          fontSize: '0.9rem', 
          marginBottom: '10px'
        }}>
          <span>{formatDate(post.projectDate || post.createdAt)}</span> {/* Usar projectDate si existe, sino createdAt */}
          <span>{post.bimestre}</span>
        </div>
        <h2 className="post-title" style={{ 
          fontSize: '1.5rem', 
          color: '#222B52', 
          marginBottom: '10px'
        }}>
          <strong>{post.title}</strong>
        </h2>
        <p className="post-description" style={{ 
          color: '#34495e', 
          marginBottom: '15px'
        }}>
          {post.content}
        </p>
        {post.githublink && (
          <button
            onClick={() => window.open(post.githublink, '_blank', 'noopener,noreferrer')}
            style={{
              display: 'inline-block',
              padding: '8px 15px',
              backgroundColor: '#B25640',
              color: '#F8F7F0',
              textDecoration: 'none',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#9e4b38'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#B25640'}
          >
            <i className="fab fa-github"></i> Ver en GitHub
          </button>
        )}
      </div>

      <div className="comments-section" style={{ marginTop: '20px' }}>
        <h3 style={{ color: '#222B52', marginBottom: '10px' }}>Comentarios</h3>
        {comments.length === 0 ? (
          <p className="no-comments" style={{ color: '#7F858D' }}>
            No hay comentarios aún. ¡Sé el primero en comentar!
          </p>
        ) : (
          comments.map((comment, index) => (
            <div key={index} className="comment" style={{ 
              backgroundColor: '#F8F7F0', 
              padding: '10px', 
              borderRadius: '5px', 
              marginBottom: '10px'
            }}>
              <p className="comment-meta" style={{ 
                fontSize: '0.9rem', 
                color: '#7F858D', 
                marginBottom: '5px'
              }}>
                {comment.author} <span>{new Date(comment.createdAt).toLocaleDateString('es-ES')}</span>
              </p>
              <p style={{ color: '#34495e' }}>{comment.content}</p>
            </div>
          ))
        )}
      </div>

      <div className="form-section" style={{ marginTop: '20px' }}>
        <h3 style={{ color: '#222B52', marginBottom: '10px' }}>Agregar un comentario</h3>
        <form onSubmit={handleCommentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            type="text"
            value={commentAuthor}
            onChange={(e) => setCommentAuthor(e.target.value)}
            placeholder="Tu nombre"
            required
            style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Escribe tu comentario aquí..."
            required
            style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ddd', minHeight: '80px' }}
          />
          <button 
            type="submit" 
            disabled={!commentText.trim() || !commentAuthor.trim()}
            style={{ 
              padding: '10px', 
              backgroundColor: '#B25640', 
              color: '#F8F7F0', 
              border: 'none', 
              borderRadius: '5px', 
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#9e4b38'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#B25640'}
          >
            Enviar comentario
          </button>
        </form>
      </div>
    </div>
  )
}

export default Post