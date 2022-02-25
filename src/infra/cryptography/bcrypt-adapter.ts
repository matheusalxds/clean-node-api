import { Hasher, HashComparer } from '@/data/protocols/critography'

import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number) {}

  async hash (value: string): Promise<Hasher.Modal> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }

  async compare (value: string, hash: string): Promise<HashComparer.Modal> {
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }
}
