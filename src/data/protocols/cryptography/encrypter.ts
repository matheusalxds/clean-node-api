export interface Encrypter {
  encrypt: (value: string) => Promise<Encrypter.Modal>
}

export namespace Encrypter {
  export type Modal = string
}
