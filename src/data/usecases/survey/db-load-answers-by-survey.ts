import { LoadAnswersBySurvey } from '@/domain/usecases/survey'
import { LoadAnswersBySurveyRepository } from '@/data/protocols/db/survey'

export class DbLoadAnswersBySurvey implements LoadAnswersBySurvey {
  constructor (private readonly loadAnswersBySurveyRepository: LoadAnswersBySurveyRepository) {}

  async loadAnswers (id: string): Promise<LoadAnswersBySurvey.Result> {
    return this.loadAnswersBySurveyRepository.loadAnswers(id)
  }
}
