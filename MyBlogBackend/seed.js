require('dotenv').config()
const mongoose = require('mongoose')
const Post = require('./src/Posts/post.model.js') 

// Conexión a MongoDB usando las variables de entorno
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Datos iniciales de los proyectos
const posts = [
  {
    title: "Proyecto 1: Sistema de Gestión",
    content: "Este proyecto consiste en un sistema de gestión para pequeñas empresas, desarrollado con JavaScript y Node.js.",
    course: "Course 1"
  },
  {
    title: "Proyecto 2: Aplicación de Tareas",
    content: "Una aplicación de lista de tareas creada con React y Firebase para la gestión de actividades diarias.",
    course: "Course 2"
  },
  {
    title: "Proyecto 3: Portafolio Personal",
    content: "Un portafolio personal diseñado con HTML, CSS y JavaScript para mostrar mis habilidades como desarrollador.",
    course: "Course 3"
  }
]

async function seedDatabase() {
  try {
    await Post.deleteMany()
    await Post.insertMany(posts)
    console.log('Datos iniciales insertados con éxito en la base de datos MyBlogPersonal')
  } catch (error) {
    console.error('Error al insertar datos:', error)
  } finally {
    mongoose.connection.close()
  }
}

seedDatabase()