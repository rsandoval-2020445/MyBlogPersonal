import React from 'react'

const Post = ({ post }) => {
  return (
    <div className="post">
      <div className="post-image">
        {post.imageUrl && (
          <a href={post.githublink} target="_blank" rel="noopener noreferrer">
            <img src={post.imageUrl} alt={post.title} />
          </a>
        )}
      </div>
      <div className="post-content">
        <div className="post-meta">
          <span className="post-date">{new Date(post.createdAt).toLocaleDateString('es-ES')}</span>
          <span className="post-category">{post.bimestre}</span>
        </div>
        <h2 className="post-title"><strong>{post.title}</strong></h2>
        <p className="post-description">{post.content}</p>
      </div>
    </div>
  )
}

export default Post