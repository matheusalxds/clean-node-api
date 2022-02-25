import { LoadSurveys } from '@/domain/usecases/survey'
import { LoadSurveysRepository } from '@/data/protocols/db/survey'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {
  }

  async load (accountId: string): Promise<LoadSurveys.Model> {
    const surveys = await this.loadSurveysRepository.loadAll(accountId)
    return surveys
  }
}
