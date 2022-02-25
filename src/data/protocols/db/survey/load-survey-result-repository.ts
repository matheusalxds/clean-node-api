import { SurveyResultModel } from '@/domain/models'

export interface LoadSurveyResultRepository {
  loadBySurveyId: (surveyId: string, accountId: string) => Promise<LoadSurveyResultRepository.Model>
}

export namespace LoadSurveyResultRepository {
  export type Model = SurveyResultModel
}
