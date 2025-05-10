import { Link } from 'react-router-dom'

const Home = () => (
  <div className="home">
    <h1>Bienvenido al Blog de Aprendizaje</h1>
    <p>Explora las publicaciones y comentarios de cada curso. ¡Selecciona un curso para comenzar!</p>
    <div className="course-cards">
      <Link to="/course1" className="course-card course1">
        <h2>Course 1</h2>
        <p>Ver publicaciones de Course 1</p>
      </Link>
      <Link to="/course2" className="course-card course2">
        <h2>Course 2</h2>
        <p>Ver publicaciones de Course 2</p>
      </Link>
      <Link to="/course3" className="course-card course3">
        <h2>Course 3</h2>
        <p>Ver publicaciones de Course 3</p>
      </Link>
    </div>
  </div>
)

export default Home