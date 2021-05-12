export const unauthorizedResponse = {
  description: 'Invalid credentials',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
