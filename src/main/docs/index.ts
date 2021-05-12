import { loginPath } from '@/main/docs/paths/login-path'
import { accountSchema } from '@/main/docs/schemas/account-schema'
import { loginParamsSchema } from '@/main/docs/schemas/login-params-schema'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description: 'Mango\'s course to create surveys between programmers',
    version: '1.0.0'
  },
  servers: [
    { url: '/api' }
  ],
  tags: [
    { name: 'Login' }
  ],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema
  }
}
