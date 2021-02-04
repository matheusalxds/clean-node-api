import { SignUpController } from '../../../../../presentation/controllers/login/signup/signup-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeSignValidation } from './signup-validation-factory'
import { makeDbAuthentication } from '../../../usecases/account/authentication/db-authentication-factory'
import { makeDbAddAccount } from '../../../usecases/account/add-account/db-add-account-factory'
import { makeLogControllerDecorator } from '../../../decorators/log-controlelr-decorator-factory'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
