import jwt from 'jsonwebtoken'
import { Encrypter } from '../../../data/protocols/critography/encrypter'

export class JwtAdapter implements Encrypter {
  private readonly secret
  constructor (secret: string) {
    this.secret = secret
  }

  async encrypt (value: string): Promise<string> {
    await jwt.sign({ id: value }, this.secret)
    return new Promise(resolve => resolve(null))
  }
}
