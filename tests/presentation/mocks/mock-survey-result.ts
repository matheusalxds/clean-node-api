import { SaveSurveyResult } from '@/domain/usecases/survey'
import { mockSurveyResultModel } from '@/tests/domain/mocks'

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (data: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
      return Promise.resolve(mockSurveyResultModel())
    }
  }

  return new SaveSurveyResultStub()
}
