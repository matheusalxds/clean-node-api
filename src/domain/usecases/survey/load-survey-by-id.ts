import { SurveyModel } from '@/domain/models/survey'

export interface LoadSurveyById {
  loadById: (id: string) => Promise<LoadSurveyById.Model>
}

export namespace LoadSurveyById {
  export type Model = SurveyModel
}
