import { CheckSurveyById } from '@/domain/usecases/survey'
import { CheckSurveyByIdRepository } from '@/data/protocols/db/survey'

export class DbCheckSurveyById implements CheckSurveyById {
  constructor (private readonly checkSurveyByIdRepository: CheckSurveyByIdRepository) {}

  async checkById (id: string): Promise<CheckSurveyById.Result> {
    return this.checkSurveyByIdRepository.checkById(id)
  }
}
