import dotenv from 'dotenv'
import { connect } from './configs/mongo.js'
import Post from './src/Posts/post.model.js'
import mongoose from 'mongoose' // Importar mongoose explícitamente

// Cargar las variables de entorno
dotenv.config()

// Datos iniciales de los proyectos desde 4to a 6to grado
const posts = [
  // Taller I (4to Grado)
  {
  title: 'Calculadora Básica',
    content: 'Una calculadora simple en HTML y JavaScript...',
    course: 'Taller I',
    bimestre: 'Bimestre 1',
    githublink: 'https://github.com/rsandoval-2020445/CalculadoraBasica',
    imageUrl: 'img/calcu.avif',
    createdAt: new Date('2025-04-01'),
  },
  {
    title: "Juego de Adivinanzas",
    content: "Un juego de adivinanzas en JavaScript donde el usuario debe adivinar un número entre 1 y 100.",
    course: "Taller I",
    bimestre: "Bimestre 2",
    githublink: "https://github.com/rsandoval-2020445/JuegoAdivinanzas",
  },
  {
    title: "Página Personal",
    content: "Una página personal estática con HTML y CSS para mostrar información sobre mí y mis intereses.",
    course: "Taller I",
    bimestre: "Bimestre 1",
    githublink: "https://github.com/rsandoval-2020445/PaginaPersonal",
  },
  {
    title: "Sistema de Inventario",
    content: "Un sistema básico de inventario en JavaScript para registrar productos y sus cantidades.",
    course: "Taller I",
    bimestre: "Bimestre 4",
    githublink: "https://github.com/rsandoval-2020445/SistemaInventario",
  },
  // Taller II (5to Grado)
  {
    title: "To-Do List",
    content: "Una aplicación de lista de tareas con JavaScript y almacenamiento en localStorage.",
    course: "Taller II",
    bimestre: "Bimestre 1",
    githublink: "https://github.com/rsandoval-2020445/ToDoList",
  },
  {
    title: "API de Clima",
    content: "Una aplicación que consume una API de clima para mostrar el pronóstico del tiempo.",
    course: "Taller II",
    bimestre: "Bimestre 2",
    githublink: "https://github.com/rsandoval-2020445/APIClima",
  },
  {
    title: "Juego de Memoria",
    content: "Un juego de memoria con tarjetas en React para emparejar imágenes.",
    course: "Taller II",
    bimestre: "Bimestre 3",
    githublink: "https://github.com/rsandoval-2020445/JuegoMemoria",
  },
  {
    title: "Sistema de Registro",
    content: "Un sistema de registro de usuarios con Node.js y Express, usando una base de datos local.",
    course: "Taller II",
    bimestre: "Bimestre 4",
    githublink: "https://github.com/rsandoval-2020445/SistemaRegistro",
  },
  // Taller III (6to Grado)
  {
    title: "Blog Personal (Proyecto Final)",
    content: "Un blog personal con React y Node.js para mostrar mis proyectos de informática.",
    course: "Taller III",
    bimestre: "Proyecto Final",
    githublink: "https://github.com/rsandoval-2020445/MyBlogPersonal",
  },
]

async function seedDatabase() {
  try {
    // Conectar a la base de datos usando la función connect de mongo.js
    await connect()

    // Limpia la colección antes de insertar nuevos datos
    await Post.deleteMany()
    await Post.insertMany(posts)
    console.log('Datos iniciales insertados con éxito en la base de datos MyBlogPersonal')
  } catch (error) {
    console.error('Error al insertar datos:', error)
  } finally {
    // Cerrar la conexión a MongoDB
    await mongoose.connection.close()
  }
}

seedDatabase()