import { Router } from 'express'
import { createComment, getCommentsByPost } from './comment.controller.js'
import { addCommentaryValidator } from '../../helpers/validators.js' 
import { commentLimiter } from '../../middlewares/rate.limit.js'
import { validateErrors } from '../../helpers/validate.error.js'  

const api = Router()

// Rutas públicas
api.get('/:postId', getCommentsByPost)
api.post('/', commentLimiter, addCommentaryValidator, validateErrors, createComment)

export default api