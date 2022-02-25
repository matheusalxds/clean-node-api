import { SurveyModel } from '@/domain/models'

export interface LoadSurveyByIdRepository {
  loadById: (id: string) => Promise<LoadSurveyByIdRepository.Model>
}

export namespace LoadSurveyByIdRepository {
  export type Model = SurveyModel
}
