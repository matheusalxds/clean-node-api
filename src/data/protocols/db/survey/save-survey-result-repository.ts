import { SaveSurveyResultParams } from '@/domain/usecases/survey'

export interface SaveSurveyResultRepository {
  save: (data: SaveSurveyResultParams) => Promise<void>
}
