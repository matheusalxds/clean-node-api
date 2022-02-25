import { SurveyModel } from '@/domain/models/survey'

export interface AddSurvey {
  add: (account: AddSurvey.Params) => Promise<void>
}

export namespace AddSurvey {
  export type Params = Omit<SurveyModel, 'id'>
}
