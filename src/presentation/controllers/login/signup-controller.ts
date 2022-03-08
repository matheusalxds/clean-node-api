import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers/http'
import { Validation } from '@/presentation/protocols/validation'
import { EmailInUseError } from '@/presentation/errors'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { AddAccount, Authentication } from '@/domain/usecases/account'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = request
      const isValid = await this.addAccount.add({
        name,
        email,
        password
      })
      if (!isValid) {
        return forbidden(new EmailInUseError())
      }
      const authenticationModel = await this.authentication.auth({
        email,
        password
      })
      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SignUpController {
  export type Request = {
    email: string
    name: string
    password: string
    passwordConfirmation: string
  }
}
