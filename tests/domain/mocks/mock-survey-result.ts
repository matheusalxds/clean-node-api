import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases/survey'
import { SurveyResultModel } from '@/domain/models'

export const mockSurveyResultModel = (): SurveyResultModel => ({
  surveyId: 'any_id',
  question: 'any_question',
  answers: [{
    answer: 'any_answer',
    count: 0,
    percent: 0,
    isCurrentAccountAnswer: false
  },
  {
    answer: 'other_answer',
    count: 0,
    percent: 0,
    image: 'any_image',
    isCurrentAccountAnswer: false
  }],
  date: new Date()
})

export const mockSaveSurveyResultParams = (): SaveSurveyResult.Params => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date()
})

export const mockLoadSurveyResult = (): LoadSurveyResult => {
  class LoadSurveyResultStub implements LoadSurveyResult {
    async load (surveyId: string): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel())
    }
  }
  return new LoadSurveyResultStub()
}
