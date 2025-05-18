import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Home from './pages/Home' // Verifica que esta ruta sea correcta
import CoursePage from './pages/CoursePage'

const App = () => (
  <div style={{ 
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: '#F8F7F0',
    minHeight: '100vh',
    margin: 0,
    padding: 0
  }}>
    <nav style={{ 
      backgroundColor: '#222B52',
      padding: '15px 20px', 
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
    }}>
      <div className="nav-container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        maxWidth: '1200px', 
        margin: '0 auto'
      }}>
        <Link to="/home" style={{ 
          color: '#F8F7F0',
          textDecoration: 'none', 
          fontSize: '1.5rem', 
          fontWeight: 'bold',
          letterSpacing: '1px'
        }}>
          Portafolio de Proyectos
        </Link>
        <div className="nav-links" style={{ 
          display: 'flex', 
          gap: '20px'
        }}>
          <Link to="/home" style={{ 
            color: '#F8F7F0',
            textDecoration: 'none',
            transition: 'color 0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = '#B25640'}
          onMouseOut={(e) => e.currentTarget.style.color = '#F8F7F0'}>
            Inicio
          </Link>
          <Link to="/course/Taller-I" style={{ 
            color: '#F8F7F0', 
            textDecoration: 'none',
            transition: 'color 0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = '#B25640'}
          onMouseOut={(e) => e.currentTarget.style.color = '#F8F7F0'}>
            Taller I
          </Link>
          <Link to="/course/Taller-II" style={{ 
            color: '#F8F7F0', 
            textDecoration: 'none',
            transition: 'color 0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = '#B25640'}
          onMouseOut={(e) => e.currentTarget.style.color = '#F8F7F0'}>
            Taller II
          </Link>
          <Link to="/course/Taller-III" style={{ 
            color: '#F8F7F0', 
            textDecoration: 'none',
            transition: 'color 0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = '#B25640'}
          onMouseOut={(e) => e.currentTarget.style.color = '#F8F7F0'}>
            Taller III
          </Link>
        </div>
      </div>
    </nav>
    <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/course/:course" element={<CoursePage />} />
      </Routes>
    </main>
  </div>
)

export default App