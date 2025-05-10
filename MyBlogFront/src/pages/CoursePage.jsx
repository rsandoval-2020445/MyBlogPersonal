import { useState, useEffect } from 'react'
import axios from 'axios'
import Post from '../components/Post'

const CoursePage = ({ course }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:3626/api/posts/course/${course}`)
        setPosts(response.data.posts || [])
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }
    fetchPosts()
  }, [course])

  return (
    <div className="course-page">
      <h1>{course}</h1>
      {posts.length === 0 ? (
        <p className="no-posts">No hay publicaciones disponibles para este curso.</p>
      ) : (
        posts.map((post) => <Post key={post._id} post={post} />)
      )}
    </div>
  )
}

export default CoursePage