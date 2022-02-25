import { AccountModel } from '@/domain/models'

export interface LoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<LoadAccountByEmailRepository.Model>
}

export namespace LoadAccountByEmailRepository {
  export type Model = AccountModel
}
