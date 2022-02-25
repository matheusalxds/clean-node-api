import { AccountModel } from '@/domain/models'

export interface AddAccountRepository {
  add: (accountData: AddAccountRepository.Params) => Promise<AddAccountRepository.Model>
}

export namespace AddAccountRepository {
  export type Params = Omit<AccountModel, 'id'>
  export type Model = boolean
}
