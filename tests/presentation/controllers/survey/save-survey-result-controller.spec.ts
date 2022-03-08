import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http'
import { LoadAnswersBySurveySpy, mockSaveSurveyResult } from '@/tests/presentation/mocks'
import { mockSurveyResultModel, throwError } from '@/tests/domain/mocks'

import mockDate from 'mockdate'
import { SaveSurveyResultController } from '@/presentation/controllers/survey'
import { SaveSurveyResult } from '@/domain/usecases/survey'

const mockRequest = (answer: string = null): SaveSurveyResultController.Request => ({
  surveyId: 'any_survey_id',
  answer,
  accountId: 'any_account_id'
})

type SutTypes = {
  sut: SaveSurveyResultController
  loadAnswersBySurveySpy: LoadAnswersBySurveySpy
  saveSurveyResultStub: SaveSurveyResult
}

const makeSut = (): SutTypes => {
  const loadAnswersBySurveySpy = new LoadAnswersBySurveySpy()
  const saveSurveyResultStub = mockSaveSurveyResult()

  const sut = new SaveSurveyResultController(loadAnswersBySurveySpy, saveSurveyResultStub)

  return {
    sut,
    loadAnswersBySurveySpy,
    saveSurveyResultStub
  }
}

describe('SaveSurveyResult Controller', () => {
  beforeAll(() => {
    mockDate.set(new Date())
  })

  afterAll(() => {
    mockDate.reset()
  })

  test('should call LoadSurveyById with correct values', async () => {
    const { sut, loadAnswersBySurveySpy } = makeSut()
    const loadSpy = jest.spyOn(loadAnswersBySurveySpy, 'loadAnswers')
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_survey_id')
  })

  test('should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadAnswersBySurveySpy } = makeSut()
    jest.spyOn(loadAnswersBySurveySpy, 'loadAnswers').mockReturnValueOnce(Promise.resolve([]))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('should return 500 if LoadSurveys throws', async () => {
    const { sut, loadAnswersBySurveySpy } = makeSut()
    jest.spyOn(loadAnswersBySurveySpy, 'loadAnswers').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 403 if invalid answer is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      surveyId: 'any_survey_id',
      accountId: 'any_account_id',
      answer: null
    })
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('answer')))
  })

  test('should call SaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultStub, loadAnswersBySurveySpy } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultStub, 'save')
    await sut.handle(mockRequest(loadAnswersBySurveySpy.result[0]))
    expect(saveSpy).toHaveBeenCalledWith({
      surveyId: 'any_survey_id',
      accountId: 'any_account_id',
      date: new Date(),
      answer: loadAnswersBySurveySpy.result[0]
    })
  })

  test('should return 500 if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultStub, loadAnswersBySurveySpy } = makeSut()
    jest.spyOn(saveSurveyResultStub, 'save').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest(loadAnswersBySurveySpy.result[0]))
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 200 on success', async () => {
    const { sut, loadAnswersBySurveySpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest(loadAnswersBySurveySpy.result[0]))
    expect(httpResponse).toEqual(ok(mockSurveyResultModel()))
  })
})
