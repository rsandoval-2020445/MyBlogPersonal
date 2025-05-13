import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Post from '../components/Post'

const CoursePage = () => {
  const { course } = useParams()
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [selectedBimestre, setSelectedBimestre] = useState('Todos')
  const [loading, setLoading] = useState(true)

  const formattedCourse = course ? course.replace('-', ' ') : 'Unknown Course'

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        console.log(`Attempting to fetch posts for course: ${formattedCourse}`)
        const response = await axios.get(`http://localhost:3626/api/posts/course/${encodeURIComponent(formattedCourse)}`)
        console.log(`API Response for ${formattedCourse}:`, response.data)
        const fetchedPosts = response.data.posts || []
        setPosts(fetchedPosts)
        setFilteredPosts(fetchedPosts)
      } catch (error) {
        console.error(`Error fetching posts for ${formattedCourse}:`, error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [formattedCourse])

  const handleFilterChange = (bimestre) => {
    setSelectedBimestre(bimestre)
    if (bimestre === 'Todos') {
      setFilteredPosts(posts)
    } else {
      setFilteredPosts(posts.filter((post) => post.bimestre === bimestre))
    }
  }

  return (
    <div className="course-page">
      <h1>{formattedCourse}</h1>
      <p>Explora los proyectos de este taller. Usa el filtro para verlos por bimestre.</p>
      <div className="filter-section">
        <label>Filtrar por: </label>
        <select value={selectedBimestre} onChange={(e) => handleFilterChange(e.target.value)}>
          <option value="Todos">Todos</option>
          <option value="Bimestre 1">Bimestre 1</option>
          <option value="Bimestre 2">Bimestre 2</option>
          <option value="Bimestre 3">Bimestre 3</option>
          <option value="Bimestre 4">Bimestre 4</option>
          <option value="Proyecto Final">Proyecto Final</option>
        </select>
      </div>
      {loading ? (
        <p>Cargando proyectos...</p>
      ) : filteredPosts.length === 0 ? (
        <p className="no-posts">No hay proyectos disponibles para este bimestre.</p>
      ) : (
        <div className="posts-container">
          {filteredPosts.map((post) => <Post key={post._id} post={post} />)}
        </div>
      )}
    </div>
  )
}

export default CoursePage