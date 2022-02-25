import { SaveSurveyResultRepository, LoadSurveyResultRepository } from '@/data/protocols/db/survey'
import { SaveSurveyResult } from '@/domain/usecases/survey'
import { mockSurveyResultModel } from '@/tests/domain/mocks'

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResult.Params): Promise<void> {
      return Promise.resolve()
    }
  }

  return new SaveSurveyResultRepositoryStub()
}

export const mockLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
  class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
    async loadBySurveyId (surveyId: string): Promise<LoadSurveyResultRepository.Model> {
      return Promise.resolve(mockSurveyResultModel())
    }
  }
  return new LoadSurveyResultRepositoryStub()
}
