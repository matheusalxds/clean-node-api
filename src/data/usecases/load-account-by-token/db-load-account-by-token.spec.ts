import { Decrypter } from '../../protocols/critography/decrypter'
import { DbLoadAccountByToken } from './db-load-account-by-token'
import { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token'

interface SutTypes {
  sut: LoadAccountByToken
  decrypterStub: Decrypter
}

const makeDecrupter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve('any_value'))
    }
  }
  return new DecrypterStub()
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrupter()
  const sut = new DbLoadAccountByToken(decrypterStub)

  return {
    sut,
    decrypterStub
  }
}

describe('DbLoadAccountByToken Usecase', () => {
  test('should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token', 'any_role')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  test('should return null if Decrypter returns nulls', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBe(null)
  })
})
