import { Encrypter, Decrypter } from '@/data/protocols/cryptography'

import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {
  }

  async encrypt (value: string): Promise<Encrypter.Modal> {
    const accessToken = await jwt.sign({ id: value }, this.secret)
    return accessToken
  }

  async decrypt (token: string): Promise<Decrypter.Modal> {
    const value: any = await jwt.verify(token, this.secret)
    return value
  }
}
