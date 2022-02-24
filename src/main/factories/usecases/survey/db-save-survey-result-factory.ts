import { SaveSurveyResult } from '@/domain/usecases/survey'
import { DbSaveSurveyResult } from '@/data/usecases/survey'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey'

export const makeDbSaveSurveyResult = (): SaveSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  return new DbSaveSurveyResult(surveyResultMongoRepository, surveyResultMongoRepository)
}
