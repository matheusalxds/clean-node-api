import { AddAccount } from '@/domain/usecases/account'
import { Hasher } from '@/data/protocols/critography'
import { AddAccountRepository, LoadAccountByEmailRepository } from '@/data/protocols/db/account'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccount.Params): Promise<AddAccount.Model> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (!account) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      return await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    }
    return null
  }
}
