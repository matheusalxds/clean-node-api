import { AddSurveyParams } from '@/domain/usecases/survey'

export interface AddSurveyRepository {
  add: (surveyData: AddSurveyParams) => Promise<void>
}
