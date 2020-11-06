import { RequiredFieldValidation } from './required-fied-validation'
import { MissingParamError } from '../../errors'

describe('RequiredField Validation', () => {
  test('should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({ name: 'any_field' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
