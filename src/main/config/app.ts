import setupMiddlewares from './middlewares'
import setupApolloServer from './apollo-server'
import setupRoutes from './routes'
import setupSwagger from './swagger'
import setupStaticFiles from './static-files'
import express from 'express'

const app = express()

// graphql
void setupApolloServer(app)

// static files
setupStaticFiles(app)

// docs
setupSwagger(app)

// middlewares
setupMiddlewares(app)

// routes
setupRoutes(app)

export default app
