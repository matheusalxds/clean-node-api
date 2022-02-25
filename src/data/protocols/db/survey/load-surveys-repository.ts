import { SurveyModel } from '@/domain/models'

export interface LoadSurveysRepository {
  loadAll: (accountId: string) => Promise<LoadSurveysRepository.Model>
}

export namespace LoadSurveysRepository {
  export type Model = SurveyModel[]
}
