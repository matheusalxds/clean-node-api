import { AddSurvey, AddSurveyModel, AddSurveyRepository } from './db-add-survey-protocols'

export class DbAddSurvey implements AddSurvey {
  constructor (private readonly addSurveyRepository: AddSurveyRepository) {}
  async add (account: AddSurveyModel): Promise<void> {
    await this.addSurveyRepository.add(account)
  }
}
