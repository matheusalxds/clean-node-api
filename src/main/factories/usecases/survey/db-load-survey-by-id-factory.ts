import { SurveyMongoRepository } from '@/infra/db/mongodb/survey'
import { LoadSurveyById } from '@/domain/usecases/survey'
import { DbLoadSurveyById } from '@/data/usecases/survey'

export const makeDbLoadSurveyById = (): LoadSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyById(surveyMongoRepository)
}
