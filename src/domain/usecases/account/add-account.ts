export interface AddAccount {
  add: (account: AddAccount.Params) => Promise<AddAccount.Model>
}

export namespace AddAccount {
  export type Params = { name: string, email: string, password: string }
  export type Model = boolean
}
