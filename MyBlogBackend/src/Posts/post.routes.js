import { Router } from 'express'
import { createPost, getPosts, getPostById, getPostsByCourse, getPostsByBimestre, updatePost, deletePost } from './post.controller.js'
import { addPostValidator, updatePostValidator } from '../../helpers/validators.js'  
import { validateErrors } from '../../helpers/validate.error.js'  

const api = Router()

// Rutas públicas
api.get('/', getPosts)
api.get('/:id', getPostById)
api.get('/course/:course', getPostsByCourse)
api.get('/bimestre/:bimestre', getPostsByBimestre)

// Rutas ahora públicas (sin validateJwt)
api.post('/', addPostValidator, validateErrors, createPost)
api.put('/:id', updatePostValidator, validateErrors, updatePost)
api.delete('/:id', deletePost)

export default api