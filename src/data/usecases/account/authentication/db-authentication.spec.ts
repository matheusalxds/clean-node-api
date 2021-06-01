import { DbAuthentication } from './db-authentication'
import { HashComparer, Encrypter, UpdateAccessTokenRepository } from './db-authentication-protocols'
import {
  LoadAccountByEmailRepositorySpy,
  mockEncrypter,
  mockHashComparer,
  mockUpdateAccessTokenRepository
} from '@/data/test'
import { mockAuthenticationParams, throwError } from '@/domain/test'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
  hashComparerStub: HashComparer
  encrypterStub: Encrypter
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const makeFakeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const hashComparerStub = mockHashComparer()
  const encrypterStub = mockEncrypter()
  const updateAccessTokenRepositoryStub = mockUpdateAccessTokenRepository()

  const sut = new DbAuthentication(loadAccountByEmailRepositorySpy, hashComparerStub, encrypterStub, updateAccessTokenRepositoryStub)

  return {
    sut,
    loadAccountByEmailRepositorySpy,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  }
}

describe('DbAuthentication UseCase', () => {
  it('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeFakeSut()
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(loadAccountByEmailRepositorySpy.email).toBe(authenticationParams.email)
  })

  it('should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeFakeSut()
    jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  it('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeFakeSut()
    loadAccountByEmailRepositorySpy.accountModel = null
    const accessToken = await sut.auth(mockAuthenticationParams())
    expect(accessToken).toBeNull()
  })

  it('should call HashComparer with correct values', async () => {
    const { sut, hashComparerStub } = makeFakeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth(mockAuthenticationParams())
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'any_password')
  })

  it('should throw if HashComparer throws', async () => {
    const { sut, hashComparerStub } = makeFakeSut()
    jest.spyOn(hashComparerStub, 'compare').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  it('should return null if HashComparer returns false', async () => {
    const { sut, hashComparerStub } = makeFakeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(Promise.resolve(false))
    const accessToken = await sut.auth(mockAuthenticationParams())
    expect(accessToken).toBeNull()
  })

  it('should call Encrypter with correct id', async () => {
    const { sut, encrypterStub } = makeFakeSut()
    const generateSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth(mockAuthenticationParams())
    expect(generateSpy).toHaveBeenCalledWith('any_id')
  })

  it('should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeFakeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  it('should return a token on success', async () => {
    const { sut } = makeFakeSut()
    const accessToken = await sut.auth(mockAuthenticationParams())
    expect(accessToken).toBe('any_token')
  })

  it('should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeFakeSut()
    const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
    await sut.auth(mockAuthenticationParams())
    expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token')
  })

  it('should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeFakeSut()
    jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })
})
