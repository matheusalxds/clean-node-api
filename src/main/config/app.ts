import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import setupSwaggr from './config-swagger'
import express from 'express'

const app = express()

// docs
setupSwaggr(app)

// middlewares
setupMiddlewares(app)

// routes
setupRoutes(app)

export default app
