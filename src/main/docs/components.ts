import { apiKeyAuthSchema } from '@/main/docs/schemas/'
import {
  badRequestResponse,
  forbiddenResponse,
  unauthorizedResponse,
  serverErrorResponse,
  notFoundResponse
} from '@/main/docs/components/'

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema
  },
  badRequest: badRequestResponse,
  forbidden: forbiddenResponse,
  unauthorized: unauthorizedResponse,
  serverError: serverErrorResponse,
  notFound: notFoundResponse
}
