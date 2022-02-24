import { makeDbAddSurvey } from '@/main/factories/usecases/survey'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeAddSurveyValidation } from '@/main/factories/controllers/survey'
import { AddSurveyController } from '@/presentation/controllers/survey'
import { Controller } from '@/presentation/protocols'

export const makeAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDecorator(controller)
}
