import { SurveyModel } from '@/domain/models/survey/survey'

export type AddSurveyParams = Omit<SurveyModel, 'id'>

export interface AddSurvey {
  add: (account: AddSurveyParams) => Promise<void>
}
