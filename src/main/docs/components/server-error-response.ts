export const serverErrorResponse = {
  description: 'Server error',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
