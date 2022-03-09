import { makeLoginController } from '@/main/factories/controllers/login'
import { adaptResolver } from '@/main/adapters'

export default {
  Query: {
    login: async (parent: any, args: any) => adaptResolver(makeLoginController(), args)
  }
}
