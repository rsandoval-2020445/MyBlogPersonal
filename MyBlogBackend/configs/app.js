import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { connect } from '../configs/mongo.js'
import postRoutes from '../src/Posts/post.routes.js'
import commentRoutes from '../src/Comments/comment.routes.js'

const configs = (app) => {
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cors())
  app.use(helmet())
  app.use(morgan('dev'))
}

const routes = (app) => {
  app.use('/api/posts', postRoutes)
  app.use('/api/comments', commentRoutes)
}

export const initServer = async () => {
  const app = express()
  try {
    configs(app)
    routes(app)
    await connect()
    app.listen(process.env.PORT)
    console.log(`Server running on port ${process.env.PORT} a las`, new Date().toLocaleString('es-ES', { timeZone: 'America/Chicago' }))
  } catch (err) {
    console.error('Server init failed', err)
  }
}