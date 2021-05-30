import { SaveSurveyResultParams } from '@/domain/usecases/survey-results/save-survey-result'

export interface SaveSurveyResultRepository {
  save: (data: SaveSurveyResultParams) => Promise<void>
}
