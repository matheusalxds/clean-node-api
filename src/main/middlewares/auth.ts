import { adaptMiddleware } from '@/main/adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '@/main/factories/middleware/auth-middleware-factory'

export const auth = adaptMiddleware(makeAuthMiddleware())
