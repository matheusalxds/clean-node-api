import env from '@/main/config/env'
import { Authentication } from '@/domain/usecases/account'
import { AccountMongoRepository } from '@/infra/db/mongodb/account'
import { BcryptAdapter, JwtAdapter } from '@/infra/cryptography'
import { DbAuthentication } from '@/data/usecases/authentication'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
}
