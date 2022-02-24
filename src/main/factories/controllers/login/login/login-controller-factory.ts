import { Controller } from '@/presentation/protocols'
import { LoginController } from '@/presentation/controllers/login'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeLoginValidation } from '@/main/factories/controllers/login/login'
import { makeDbAuthentication } from '@/main/factories/usecases/authentication'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(controller)
}
