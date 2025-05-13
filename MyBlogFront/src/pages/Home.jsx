import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="home">
      <h1>Bienvenido al Blog de Aprendizaje</h1>
      <p>Explora las publicaciones y comentarios de cada curso. ¡Selecciona un curso para comenzar!</p>

      {/* Botones para cada curso */}
      <div className="course-buttons">
        <Link to="/course/Taller-I" className="course-button">
          Taller I
          <br />
          <small>Ver publicaciones de Taller I</small>
        </Link>
        <Link to="/course/Taller-II" className="course-button">
          Taller II
          <br />
          <small>Ver publicaciones de Taller II</small>
        </Link>
        <Link to="/course/Taller-III" className="course-button">
          Taller III
          <br />
          <small>Ver publicaciones de Taller III</small>
        </Link>
      </div>
    </div>
  )
}

export default Home