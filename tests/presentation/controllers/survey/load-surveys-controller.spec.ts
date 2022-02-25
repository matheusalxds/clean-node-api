import { LoadSurveys } from '@/domain/usecases/survey/load-surveys'
import { LoadSurveysController } from '@/presentation/controllers/survey/load-surveys-controller'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadSurveysSpy } from '../../mocks'
import { mockSurveyModels, throwError } from '@/tests/domain/mocks'
import mockDate from 'mockdate'
import faker from 'faker'

type SutTypes = {
  sut: LoadSurveysController
  loadSurveysStub: LoadSurveys
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = new LoadSurveysSpy()
  const sut = new LoadSurveysController(loadSurveysStub)

  return {
    sut,
    loadSurveysStub
  }
}

const mockRequest = (): LoadSurveysController.Request => ({ accountId: faker.datatype.uuid() })

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    mockDate.set(new Date())
  })

  afterAll(() => {
    mockDate.reset()
  })

  test('should call LoadSurveys with correct value', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith(httpRequest.accountId)
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockSurveyModels()))
  })

  test('should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(Promise.resolve([]))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
