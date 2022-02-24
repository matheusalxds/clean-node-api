import { DbAddSurvey } from './db-add-survey'
import { AddSurveyRepository } from './db-add-survey-protocols'
import { mockAddSurveyParams, throwError } from '@/domain/test'
import { AddSurveyRepositorySpy } from '@/data/test/mock-db-survey'

import mockDate from 'mockdate'

type SutTypes = {
  sut: DbAddSurvey
  addSurveyRepositoryStub: AddSurveyRepository
}

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = new AddSurveyRepositorySpy()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)

  return {
    sut,
    addSurveyRepositoryStub
  }
}

describe('DbAddSurvey UseCase', () => {
  beforeAll(() => {
    mockDate.set(new Date())
  })

  afterAll(() => {
    mockDate.reset()
  })

  test('should callAddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    const surveyData = mockAddSurveyParams()
    await sut.add(surveyData)
    expect(addSpy).toHaveBeenCalledWith(surveyData)
  })

  test('should callAddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    jest.spyOn(addSurveyRepositoryStub, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddSurveyParams())
    await expect(promise).rejects.toThrow()
  })
})
