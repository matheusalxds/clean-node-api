import { AddSurvey, AddSurveyParams } from '@/domain/usecases/survey'
import { AddSurveyRepository } from '@/data/protocols/db/survey'

export class DbAddSurvey implements AddSurvey {
  constructor (private readonly addSurveyRepository: AddSurveyRepository) {}
  async add (account: AddSurveyParams): Promise<void> {
    await this.addSurveyRepository.add(account)
  }
}
