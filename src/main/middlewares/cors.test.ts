import app from '@/main/config/app'
import request from 'supertest'

describe('CORS Middleware', () => {
  test('should enable cors', async () => {
    app.get('/test_cors', (req, res) => {
      res.send()
    })

    await request(app)
      .post('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
