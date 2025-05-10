import { body } from 'express-validator'  // Captura todo el body de la solicitud
import { validateErrorWithoutImg } from './validate.error.js'  // Middleware para manejar errores
import { existPost } from './db.validators.js'  // Validación de existencia de publicación

// Validación para la creación de una publicación
export const addPostValidator = [
    body('title', 'Title is required').notEmpty().isLength({ max: 100 }),
    body('content', 'Content is required').notEmpty(),
    body('course', 'Course is required').notEmpty(),
    validateErrorWithoutImg,
]

// Validación para la actualización de una publicación
export const updatePostValidator = [
    body('title', 'Title is required').optional().notEmpty().isLength({ max: 100 }),
    body('content', 'Content is required').optional().notEmpty(),
    body('course', 'Course is required').optional().notEmpty(),
    validateErrorWithoutImg,
]

// Validación para la creación de un comentario
export const addCommentaryValidator = [
    body('content', 'Content is required').notEmpty().isLength({ max: 500 }),
    body('postId', 'Post is required').notEmpty().custom(existPost),  // Validación de existencia de la publicación
    validateErrorWithoutImg,
]

// Validación para la actualización de un comentario
export const updateCommentaryValidator = [
    body('content', 'Content is required').optional().notEmpty().isLength({ max: 500 }),
    body('postId', 'Post is required').optional().notEmpty().custom(existPost),  // Validación de existencia de la publicación
    validateErrorWithoutImg,
]
