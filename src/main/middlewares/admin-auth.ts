import { adaptMiddleware } from '@/main/adapters'
import { makeAuthMiddleware } from '@/main/factories/middleware'

export const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
