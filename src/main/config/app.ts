import express from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'

const app = express()

// middlewares
setupMiddlewares(app)

// routes
setupRoutes(app)

export default app
