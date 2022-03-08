import { LoadSurveyById } from '@/domain/usecases/survey'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey'

export class DbLoadSurveyById implements LoadSurveyById {
  constructor (private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository) {}

  async loadById (id: string): Promise<LoadSurveyById.Model> {
    return this.loadSurveyByIdRepository.loadById(id)
  }
}
