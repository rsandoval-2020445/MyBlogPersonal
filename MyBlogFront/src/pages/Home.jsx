import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div style={{
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      backgroundColor: '#F8F7F0', // IVORY como fondo
      minHeight: '100vh',
      padding: '40px 20px',
      color: '#333',
      textAlign: 'center'
    }}>
      <header style={{
        maxWidth: '800px',
        margin: '0 auto 50px auto'
      }}>
        <h1 style={{
          fontSize: '3rem',
          color: '#222B52', // MARINA para el título
          marginBottom: '20px',
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}>
          Portafolio de Proyectos
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#7F858D', // SLATE GRAY para texto secundario
          lineHeight: '1.6'
        }}>
          Bienvenido a mi portafolio de proyectos académicos. Aquí encontrarás una selección de trabajos realizados en los talleres de programación, organizados por curso y bimestre. ¡Explora mis proyectos y déjame tus comentarios!
        </p>
      </header>

      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        {['Taller I', 'Taller II', 'Taller III'].map((course) => (
          <Link
            key={course}
            to={`/course/${course.replace(' ', '-')}`}
            style={{
              textDecoration: 'none',
              flex: '1 1 300px',
              maxWidth: '350px'
            }}
          >
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              padding: '20px',
              transition: 'transform 0.2s, background-color 0.3s',
              textAlign: 'center'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
              e.currentTarget.style.backgroundColor = '#B25640' // RUST al pasar el mouse
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.backgroundColor = '#fff'
            }}>
              <h2 style={{
                fontSize: '1.8rem',
                color: '#222B52', // MARINA para el título
                marginBottom: '10px',
                transition: 'color 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#F8F7F0'} // IVORY al pasar el mouse
              onMouseOut={(e) => e.currentTarget.style.color = '#222B52'}>
                {course}
              </h2>
              <p style={{
                color: '#7F858D', // SLATE GRAY para texto secundario
                transition: 'color 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#F8F7F0'} // IVORY al pasar el mouse
              onMouseOut={(e) => e.currentTarget.style.color = '#7F858D'}>
                Explora los proyectos de {course}
              </p>
            </div>
          </Link>
        ))}
      </section>

      <footer style={{
        marginTop: '50px',
        color: '#7F858D', // SLATE GRAY para el footer
        fontSize: '0.9rem'
      }}>
        <p>© 2025 - Portafolio de Proyectos Académicos</p>
      </footer>
    </div>
  )
}

export default Home