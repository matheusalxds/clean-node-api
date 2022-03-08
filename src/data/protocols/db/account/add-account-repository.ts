import { AddAccount } from '@/domain/usecases/account'

export interface AddAccountRepository {
  add: (accountData: AddAccountRepository.Params) => Promise<AddAccountRepository.Model>
}

export namespace AddAccountRepository {
  export type Params = AddAccount.Params
  export type Model = boolean
}
