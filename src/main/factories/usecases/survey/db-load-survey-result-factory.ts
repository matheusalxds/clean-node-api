import { LoadSurveyResult } from '@/domain/usecases/survey'
import { DbLoadSurveyResult } from '@/data/usecases/survey'
import { SurveyResultMongoRepository, SurveyMongoRepository } from '@/infra/db/mongodb/survey'

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyResult(surveyResultMongoRepository, surveyMongoRepository)
}
