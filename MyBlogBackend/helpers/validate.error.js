import { validationResult } from "express-validator"

// Validar los errores
export const validateErrors = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(errors)  // Pasa los errores al siguiente middleware
    }
    next()  // Si no hay errores, continúa con la solicitud
}

// Cuando no hay imágenes o archivos
export const validateErrorWithoutImg = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation errors',
            errors: errors.array(),
        })
    }
    next()  // Si no hay errores, continúa con la solicitud
}
