import { GraphQLSchema } from 'graphql'
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils'
import { makeAuthMiddleware } from '@/main/factories/middleware'
import { ForbiddenError } from 'apollo-server-express'

export const authDirectiveTransformer = (schema: GraphQLSchema): GraphQLSchema => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(schema, fieldConfig, 'auth')?.[0]

      if (authDirective) {
        const { resolve } = fieldConfig
        fieldConfig.resolve = async (source, args, context, info) => {
          const request = {
            accessToken: context?.req?.headers?.['x-access-token']
          }
          const httpResponse = await makeAuthMiddleware().handle(request)
          if (httpResponse.statusCode === 200) {
            Object.assign(context?.req, httpResponse.body)
            return resolve.call(this, source, context, info)
          } else {
            throw new ForbiddenError(httpResponse.body.message)
          }
        }
        return fieldConfig
      }
    }
  })
}
