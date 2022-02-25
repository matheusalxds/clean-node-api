import { AddAccount, LoadAccountByToken } from '@/domain/usecases/account'
import { AccountModel } from '@/domain/models'
import { Authentication } from '@/domain/usecases/account/authentication'
import { mockAccountModel } from '@/tests/domain/mocks'

export class AddAccountStub implements AddAccount {
  async add (account: AddAccount.Params): Promise<AddAccount.Model> {
    return Promise.resolve(true)
  }
}

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: Authentication.Params): Promise<Authentication.Model> {
      return Promise.resolve({
        accessToken: 'any_access_token',
        name: 'any_name'
      })
    }
  }

  return new AuthenticationStub()
}

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string, role?: string): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel())
    }
  }
  return new LoadAccountByTokenStub()
}
