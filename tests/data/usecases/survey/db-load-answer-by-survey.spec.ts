import { DbLoadAnswersBySurvey } from '@/data/usecases/survey'
import { throwError } from '@/tests/domain/mocks'
import { LoadAnswersBySurveyRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbLoadAnswersBySurvey
  loadAnswersBySurveyRepositorySpy: LoadAnswersBySurveyRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAnswersBySurveyRepositorySpy = new LoadAnswersBySurveyRepositorySpy()
  const sut = new DbLoadAnswersBySurvey(loadAnswersBySurveyRepositorySpy)

  return {
    sut,
    loadAnswersBySurveyRepositorySpy
  }
}

describe('DbLoadSurveyById', () => {
  test('should call LoadSurveyByIdRepository', async () => {
    const { sut, loadAnswersBySurveyRepositorySpy } = makeSut()
    const loadByIdSpy = jest.spyOn(loadAnswersBySurveyRepositorySpy, 'loadAnswers')
    await sut.loadAnswers('any_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('should return Survey on success', async () => {
    const { sut, loadAnswersBySurveyRepositorySpy } = makeSut()
    const answers = await sut.loadAnswers('any_id')
    expect(answers).toEqual([
      loadAnswersBySurveyRepositorySpy.result[0],
      loadAnswersBySurveyRepositorySpy.result[1]
    ])
  })

  it('should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAnswersBySurveyRepositorySpy } = makeSut()
    jest.spyOn(loadAnswersBySurveyRepositorySpy, 'loadAnswers').mockImplementationOnce(throwError)
    const promise = sut.loadAnswers('any_id')
    await expect(promise).rejects.toThrow()
  })
})
