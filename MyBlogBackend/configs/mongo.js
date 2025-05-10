// Conexión a la BD
import mongoose from 'mongoose'

export const connect = async () => {
    try {
        // Ciclo de vida de Mongo
        mongoose.connection.on('error', () => {
            console.log('MongoDB | Could not be connected to mongodb')
        })
        mongoose.connection.on('connecting', () => {
            console.log('MongoDB | trying to connect')
        })
        mongoose.connection.on('connected', () => {
            console.log('MongoDB | connected to mongodb')
        })
        mongoose.connection.once('open', () => {
            console.log('MongoDB | connected to database')
        })
        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB | reconnected to mongodb')
        })
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB | disconnected')
        })

        // Conectar a la base de datos utilizando las variables de entorno
        await mongoose.connect(
            `${process.env.DB_SERVICE}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
            {
                maxPoolSize: 50, // Máximo de conexiones
                serverSelectionTimeoutMS: 5000 // Tiempo máximo para intentar conectarse
            }
        )
    } catch (err) {
        console.error('Database connection failed', err)
    }
}
