import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import CoursePage from './pages/CoursePage'

const App = () => (
  <div>
    <nav>
      <div className="nav-container">
        <Link to="/"><h1>Portafolio de Proyectos</h1></Link>
        <div className="nav-links">
          <Link to="/course/Taller-I">Taller I</Link>
          <Link to="/course/Taller-II">Taller II</Link>
          <Link to="/course/Taller-III">Taller III</Link>
        </div>
      </div>
    </nav>
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:course" element={<CoursePage />} />
      </Routes>
    </main>
  </div>
)

export default App