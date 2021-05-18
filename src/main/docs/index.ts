import { loginPath, surveyPath } from '@/main/docs/paths'
import { badRequestResponse, forbiddenResponse, unauthorizedResponse, serverErrorResponse, notFoundResponse } from '@/main/docs/components'
import { accountSchema, loginParamsSchema, surveySchema, surveysSchema, surveyAnswerSchema, errorSchema, apiKeyAuthSchema } from '@/main/docs/schemas'

export default {
  openapi: '3.0.0',
  description: 'This is Clean Architecture\'s API documentation',
  info: {
    title: 'Clean Node API',
    description: 'Mango\'s course to create surveys between programmers',
    version: '1.0.0'
  },
  license: {
    name: 'GPL-3.0-or-later',
    url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
  },
  contact: {
    name: 'API Support',
    email: 'mathe.system@gmail.com'
  },
  servers: [
    { url: '/api' }
  ],
  tags: [
    { name: 'Login' },
    { name: 'Survey' }
  ],
  paths: {
    '/login': loginPath,
    '/surveys': surveyPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema,
    survey: surveySchema,
    surveys: surveysSchema,
    surveyAnswer: surveyAnswerSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest: badRequestResponse,
    forbidden: forbiddenResponse,
    unauthorized: unauthorizedResponse,
    serverError: serverErrorResponse,
    notFound: notFoundResponse
  }
}
