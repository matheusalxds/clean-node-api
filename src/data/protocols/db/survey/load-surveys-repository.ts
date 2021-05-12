import { SurveyModel } from '@/domain/models/survey/survey'

export interface LoadSurveysRepository {
  loadAll: () => Promise<SurveyModel[]>
}
