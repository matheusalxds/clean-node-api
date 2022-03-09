import { setupApp } from '@/main/config/app'

import request from 'supertest'
import { Express } from 'express'

let app: Express

describe('CORS Middleware', () => {
  beforeAll(async () => {
    app = await setupApp()
  })

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
