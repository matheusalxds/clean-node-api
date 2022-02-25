export interface Decrypter {
  decrypt: (value: string) => Promise<Decrypter.Modal>
}

export namespace Decrypter {
  export type Modal = string
}
