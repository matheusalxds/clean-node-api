import { LoadSurveyResultController } from '@/presentation/controllers/survey'
import { InvalidParamError } from '@/presentation/errors'
import { CheckSurveyByIdSpy } from '@/tests/presentation/mocks'
import { forbidden, ok, serverError } from '@/presentation/helpers/http'
import { LoadSurveyResult } from '@/domain/usecases/survey'
import { mockLoadSurveyResult, mockSurveyResultModel, throwError } from '@/tests/domain/mocks'

import mockDate from 'mockdate'

const mockRequest = (): LoadSurveyResultController.Request => ({
  surveyId: 'any_id',
  accountId: 'any_account_id'
})

type SutTypes = {
  sut: LoadSurveyResultController
  checkSurveyByIdSpy: CheckSurveyByIdSpy
  loadSurveyResultStub: LoadSurveyResult
}

const makeSut = (): SutTypes => {
  const checkSurveyByIdSpy = new CheckSurveyByIdSpy()
  const loadSurveyResultStub = mockLoadSurveyResult()
  const sut = new LoadSurveyResultController(checkSurveyByIdSpy, loadSurveyResultStub)
  return {
    sut,
    checkSurveyByIdSpy,
    loadSurveyResultStub
  }
}

describe('LoadSurveyResult Controller', () => {
  beforeAll(() => {
    mockDate.set(new Date())
  })

  afterAll(() => {
    mockDate.reset()
  })

  test('Should call LoadSurveyById with correct value', async () => {
    const { sut, checkSurveyByIdSpy } = makeSut()
    const request = mockRequest()
    const loadByIdSpy = jest.spyOn(checkSurveyByIdSpy, 'checkById')
    await sut.handle(request)
    expect(loadByIdSpy).toHaveBeenCalledWith(request.surveyId)
  })

  test('Should return 403 if LoadSurveyById returns null', async () => {
    const { sut, checkSurveyByIdSpy } = makeSut()
    jest.spyOn(checkSurveyByIdSpy, 'checkById').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('Should return 500 if LoadSurveyById throws', async () => {
    const { sut, checkSurveyByIdSpy } = makeSut()
    jest.spyOn(checkSurveyByIdSpy, 'checkById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call LoadSurveyResult with correct value', async () => {
    const { sut, loadSurveyResultStub } = makeSut()
    const request = mockRequest()
    const loadSpy = jest.spyOn(loadSurveyResultStub, 'load')
    await sut.handle(request)
    expect(loadSpy).toHaveBeenCalledWith(request.surveyId, request.accountId)
  })

  test('Should return 500 if LoadSurveyResult throws', async () => {
    const { sut, loadSurveyResultStub } = makeSut()
    jest.spyOn(loadSurveyResultStub, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockSurveyResultModel()))
  })
})
