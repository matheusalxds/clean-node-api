import jwt from 'jsonwebtoken'
import { Encrypter } from '../../../data/protocols/critography/encrypter'
import { Decrypter } from '../../../data/protocols/critography/decrypter'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {
  }

  async encrypt (value: string): Promise<string> {
    const accessToken = await jwt.sign({ id: value }, this.secret)
    return accessToken
  }

  async decrypt (value: string): Promise<string> {
    await jwt.verify(value, this.secret)
    return null
  }
}
