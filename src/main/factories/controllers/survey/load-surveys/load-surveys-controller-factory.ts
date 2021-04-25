import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controlelr-decorator-factory'
import { makeDbLoadSurvey } from '@/main/factories/usecases/survey/load-surveys/db-load-surveys-factory'
import { Controller } from '@/presentation/protocols'
import { LoadSurveysController } from '@/presentation/controllers/survey/load-survey/load-surveys-controller'

export const makeLoadSurveyController = (): Controller => {
  const controller = new LoadSurveysController(makeDbLoadSurvey())
  return makeLogControllerDecorator(controller)
}
