import { AccountMongoRepository } from '@/infra/db/mongodb/account'
import { BcryptAdapter } from '@/infra/cryptography'
import { AddAccount } from '@/domain/usecases/account'
import { DbAddAccount } from '@/data/usecases/account'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
