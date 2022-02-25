import { SurveyModel } from '@/domain/models'

export interface LoadSurveys {
  load: (accountId: string) => Promise<LoadSurveys.Model>
}

export namespace LoadSurveys {
  export type Model = SurveyModel[]
}
