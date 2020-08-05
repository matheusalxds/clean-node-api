import { Validation } from './validation'
import { InvalidParamError } from '../../errors'

export class CompareFieldsValidation implements Validation {
  private readonly fieldName: string
  private readonly fieldToCompareNam: string

  constructor (fieldName: string, fieldToCompareNam: string) {
    this.fieldName = fieldName
    this.fieldToCompareNam = fieldToCompareNam
  }

  validate (input: any): Error {
    if (input[this.fieldName] !== input[this.fieldToCompareNam]) {
      return new InvalidParamError(this.fieldToCompareNam)
    }
  }
}
