import { makeSignUpController } from '@/main/factories/controllers/login/signup'
import { makeLoginController } from '@/main/factories/controllers/login/login'
import { adaptRoute } from '@/main/adapters'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
