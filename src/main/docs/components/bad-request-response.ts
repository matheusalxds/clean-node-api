export const badRequestResponse = {
  description: 'Invalid Request',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
