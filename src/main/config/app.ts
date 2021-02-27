import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import express from 'express'

const app = express()

// middlewares
setupMiddlewares(app)

// routes
setupRoutes(app)

export default app
