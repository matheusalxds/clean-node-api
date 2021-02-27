import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controlelr-decorator-factory'
import { LoadSurveysController } from '../../../../../presentation/controllers/survey/load-survey/load-surveys-controller'
import { makeDbLoadSurvey } from '../../../usecases/survey/load-surveys/db-load-surveys'

export const makeLoadSurveyController = (): Controller => {
  const controller = new LoadSurveysController(makeDbLoadSurvey())
  return makeLogControllerDecorator(controller)
}
