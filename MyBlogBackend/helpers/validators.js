import { body } from 'express-validator'  
import { validateErrorWithoutImg } from './validate.error.js'
import { existPost } from './db.validators.js' 
import { check } from 'express-validator'

// Validador para agregar una publicación
export const addPostValidator = [
  check('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters long'),
  check('content')
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ min: 10 })
    .withMessage('Content must be at least 10 characters long'),
  check('course')
    .notEmpty()
    .withMessage('Course is required'),
  check('bimestre')
    .notEmpty()
    .withMessage('Bimestre is required')
    .isIn(['Bimestre 1', 'Bimestre 2', 'Bimestre 3', 'Bimestre 4', 'Proyecto Final'])
    .withMessage('Bimestre must be one of: Bimestre 1, Bimestre 2, Bimestre 3, Bimestre 4, Proyecto Final'),
  check('githublink')
    .notEmpty()
    .withMessage('GitHub link is required')
    .isURL()
    .withMessage('GitHub link must be a valid URL'),
]

// Validador para actualizar una publicación
export const updatePostValidator = [
  check('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters long'),
  check('content')
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ min: 10 })
    .withMessage('Content must be at least 10 characters long'),
  check('course')
    .notEmpty()
    .withMessage('Course is required'),
  check('bimestre')
    .notEmpty()
    .withMessage('Bimestre is required')
    .isIn(['Bimestre 1', 'Bimestre 2', 'Bimestre 3', 'Bimestre 4', 'Proyecto Final'])
    .withMessage('Bimestre must be one of: Bimestre 1, Bimestre 2, Bimestre 3, Bimestre 4, Proyecto Final'),
  check('githublink')
    .notEmpty()
    .withMessage('GitHub link is required')
    .isURL()
    .withMessage('GitHub link must be a valid URL'),
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
