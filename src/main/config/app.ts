import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import setupSwagger from './config-swagger'
import setupStaticFiles from './static-files'
import express from 'express'

const app = express()

// static files
setupStaticFiles(app)

// docs
setupSwagger(app)

// middlewares
setupMiddlewares(app)

// routes
setupRoutes(app)

export default app
