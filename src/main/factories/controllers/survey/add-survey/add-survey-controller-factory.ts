import { makeDbAddSurvey } from '@/main/factories/usecases/survey/add-survey/db-add-survey-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controlelr-decorator-factory'
import { makeAddSurveyValidation } from '@/main/factories/controllers/survey/add-survey/add-survey-validation-factory'
import { AddSurveyController } from '@/presentation/controllers/survey/add-survey/add-survey-controller'
import { Controller } from '@/presentation/protocols'

export const makeAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDecorator(controller)
}
