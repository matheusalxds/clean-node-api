import { LoadAnswersBySurvey } from '@/domain/usecases/survey'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey'
import { DbLoadAnswersBySurvey } from '@/data/usecases/survey'

export const makeDbLoadAnswersBySurvey = (): LoadAnswersBySurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadAnswersBySurvey(surveyMongoRepository)
}
