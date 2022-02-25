import { AddSurvey } from '@/domain/usecases/survey'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {}

  async handle (request: AddSurveyController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) return badRequest(error)

      const { question, answers } = request
      await this.addSurvey.add({
        question,
        answers,
        date: new Date()
      })
      return noContent()
    } catch (e) {
      return serverError(e)
    }
  }
}

export namespace AddSurveyController {
  export type Request = {
    question: string
    answers: Array<{
      image?: string
      answer: string
    }>
  }
}
