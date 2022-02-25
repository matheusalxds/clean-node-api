import { LoadSurveyById } from '@/domain/usecases/survey'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey'
import { SurveyModel } from '@/domain/models'

export class DbLoadSurveyById implements LoadSurveyById {
  constructor (private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository) {}

  async loadById (id: string): Promise<SurveyModel> {
    const survey = await this.loadSurveyByIdRepository.loadById(id)
    return survey
  }
}
