import { Controller } from '@/presentation/protocols'
import { SignUpController } from '@/presentation/controllers/login'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeSignValidation } from '@/main/factories/controllers/login/signup'
import { makeDbAuthentication } from '@/main/factories/usecases/authentication'
import { makeDbAddAccount } from '@/main/factories/usecases/account'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
