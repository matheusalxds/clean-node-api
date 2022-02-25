import { SaveSurveyResult, SaveSurveyResultParams } from '@/domain/usecases/survey'
import { LoadSurveyResultRepository, SaveSurveyResultRepository } from '@/data/protocols/db/survey'
import { SurveyResultModel } from '@/domain/models'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) {
  }

  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(data)
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(data.surveyId, data.accountId)
    return surveyResult
  }
}
