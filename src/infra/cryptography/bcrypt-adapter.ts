import { Hasher, HashComparer } from '@/data/protocols/cryptography'

import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number) {}

  async hash (value: string): Promise<Hasher.Modal> {
    return bcrypt.hash(value, this.salt)
  }

  async compare (plaintext: string, digest: string): Promise<HashComparer.Modal> {
    return bcrypt.compare(plaintext, digest)
  }
}
