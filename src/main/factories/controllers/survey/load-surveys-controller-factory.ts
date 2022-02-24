import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadSurvey } from '@/main/factories/usecases/survey'
import { Controller } from '@/presentation/protocols'
import { LoadSurveysController } from '@/presentation/controllers/survey'

export const makeLoadSurveyController = (): Controller => {
  const controller = new LoadSurveysController(makeDbLoadSurvey())
  return makeLogControllerDecorator(controller)
}
