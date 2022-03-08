import { LoadSurveyResult } from '@/domain/usecases/survey'
import { LoadSurveyResultRepository, LoadSurveyByIdRepository } from '@/data/protocols/db/survey'
import { SurveyModel } from '@/domain/models'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async load (surveyId: string, accountId: string): Promise<LoadSurveyResult.Model> {
    let surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId, accountId)
    if (!surveyResult) {
      const survey = await this.loadSurveyByIdRepository.loadById(surveyId)
      surveyResult = this.makeEmptyResult(survey)
    }
    return surveyResult
  }

  private makeEmptyResult (survey: SurveyModel): LoadSurveyResult.Model {
    return {
      surveyId: survey.id,
      question: survey.question,
      date: survey.date,
      answers: survey.answers.map(answer => ({
        ...answer,
        count: 0,
        percent: 0,
        isCurrentAccountAnswer: false
      }))
    }
  }
}
