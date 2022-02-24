import { makeLoadSurveyController, makeAddSurveyController } from '@/main/factories/controllers/survey'
import { adminAuth, auth } from '@/main/middlewares'
import { adaptRoute } from '@/main/adapters'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveyController()))
}
