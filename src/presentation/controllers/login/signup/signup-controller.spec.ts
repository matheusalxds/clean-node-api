import { AccountModel } from '@/domain/models/account'
import { AddAccount, AddAccountModel } from '@/domain/usecases/add-account'
import { Authentication, AuthenticationModel } from '@/domain/usecases/authentication'
import { HttpRequest, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { EmailInUseError, MissingParamError, ServerError } from '@/presentation/errors'
import { SignUpController } from '@/presentation/controllers/login/signup/signup-controller'

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountModel): Promise<AccountModel> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new AddAccountStub()
}

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationModel): Promise<string> {
      return new Promise((resolve) => resolve('any_token'))
    }
  }

  return new AuthenticationStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

type SutTypes = {
  sut: SignUpController
  addAccountStub: AddAccount
  validationStub: Validation
  authenticationStub: Authentication
}

// SYSTEM UNDER TEST = sut
const makeSut = (): SutTypes => {
  const authenticationStub = makeAuthentication()
  const addAccountStub = makeAddAccount()
  const validationStub = makeValidation()
  const sut = new SignUpController(addAccountStub, validationStub, authenticationStub)
  return {
    authenticationStub,
    sut,
    addAccountStub,
    validationStub
  }
}

describe('SignUp Controller', () => {
  test('should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      // throw new Error()
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('any_error')))
  })

  test('should call AddAccount', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('should return 403 AddAccount returns null', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  test('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }))
  })

  test('should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('should return 400 if validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(makeFakeRequest())
    expect(authSpy).toHaveBeenCalledWith({ email: 'any_email@mail.com', password: 'any_password' })
  })

  test('should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    // mock all the function implementation
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
