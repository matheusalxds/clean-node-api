export interface Hasher {
  hash: (plaintext: string) => Promise<Hasher.Modal>
}

export namespace Hasher {
  export type Modal = string
}
