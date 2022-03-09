import { adaptResolver } from '@/main/adapters'
import { makeLoadSurveyController } from '@/main/factories/controllers/survey'

export default {
  Query: {
    surveys: async () => adaptResolver(makeLoadSurveyController())
  }
}
