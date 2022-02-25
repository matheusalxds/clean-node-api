import { AccountModel } from '@/domain/models'

export interface LoadAccountByTokenRepository {
  loadByToken: (token: string, role?: string) => Promise<AccountModel>
}

export namespace LoadAccountByTokenRepository {
  export type Model = AccountModel
}
