import { AccountModel } from '@/domain/models'

export interface AddAccount {
  add: (account: AddAccount.Params) => Promise<AddAccount.Model>
}

export namespace AddAccount {
  export type Params = Omit<AccountModel, 'id'>
  export type Model = boolean
}
