import env from '@/main/config/env'
import { LoadAccountByToken } from '@/domain/usecases/account'
import { AccountMongoRepository } from '@/infra/db/mongodb/account'
import { JwtAdapter } from '@/infra/cryptography'
import { DbLoadAccountByToken } from '@/data/usecases/account'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
