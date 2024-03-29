import { SurveyResultModel } from '@/domain/models'

export interface LoadSurveyResult {
  load: (surveyId: string, accountId: string) => Promise<LoadSurveyResult.Model>
}

export namespace LoadSurveyResult {
  export type Model = SurveyResultModel
}
