import { SurveyModel } from '@/domain/models/survey/survey'

export interface LoadSurveys {
  load: () => Promise<SurveyModel[]>
}
