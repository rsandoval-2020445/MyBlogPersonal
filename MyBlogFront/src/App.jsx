import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import CoursePage from './pages/CoursePage'

const App = () => (
  <div>
    {/* Barra de Navegación */}
    <nav>
      <div className="nav-container">
        <Link to="/"><h1>Blog Kinal</h1></Link>
        <div className="nav-links">
          <Link to="/course1">Course 1</Link>
          <Link to="/course2">Course 2</Link>
          <Link to="/course3">Course 3</Link>
        </div>
      </div>
    </nav>

    {/* Contenido Principal */}
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course1" element={<CoursePage course="Course 1" />} />
        <Route path="/course2" element={<CoursePage course="Course 2" />} />
        <Route path="/course3" element={<CoursePage course="Course 3" />} />
      </Routes>
    </main>
  </div>
)

export default App