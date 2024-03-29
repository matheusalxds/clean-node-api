import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { serverError, ok } from '@/presentation/helpers/http/http-helper'
import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'
import { mockAccountModel } from '@/tests/domain/mocks'
import { mockLogErrorRepository } from '@/tests/data/mocks'

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: any): Promise<HttpResponse> {
      return Promise.resolve(ok(mockAccountModel()))
    }
  }

  return new ControllerStub()
}

const mockServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

type SutTypes = {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = mockLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)

  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}

describe('LogController Decorator', () => {
  test('should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const request = 'any_request'
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(request)
    expect(handleSpy).toHaveBeenCalledWith(request)
  })

  test('should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const response = await sut.handle('any_request')
    expect(response).toEqual(ok(mockAccountModel()))
  })

  test('should call LogErroRepository with correct error if controle returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(Promise.resolve(mockServerError()))
    await sut.handle('any_request')
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
