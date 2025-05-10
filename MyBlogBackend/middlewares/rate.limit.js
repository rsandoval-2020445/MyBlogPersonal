import rateLimit from 'express-rate-limit'

// Limitar las solicitudes de creación de comentarios
export const commentLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutos
    max: 5, // Limitar a 5 comentarios por IP cada 10 minutos
    message: 'Too many requests from this IP, please try again later',
    headers: true
})
