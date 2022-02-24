import { SaveSurveyResult, SaveSurveyResultParams } from '@/domain/usecases/survey/save-survey-result'
import { SurveyResultModel } from '@/domain/models'
import { mockSurveyResultModel } from '../../domain/mocks'

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel())
    }
  }

  return new SaveSurveyResultStub()
}
