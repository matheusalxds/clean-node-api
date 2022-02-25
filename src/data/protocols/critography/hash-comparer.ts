export interface HashComparer {
  compare: (value: string, hash: string) => Promise<HashComparer.Modal>
}

export namespace HashComparer {
  export type Modal = boolean
}
