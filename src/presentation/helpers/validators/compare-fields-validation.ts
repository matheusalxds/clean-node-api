import { Validation } from '../../protocols/validation'
import { InvalidParamError } from '../../errors'

export class CompareFieldsValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly fieldToCompareNam: string) { }

  validate (input: any): Error {
    if (input[this.fieldName] !== input[this.fieldToCompareNam]) {
      return new InvalidParamError(this.fieldToCompareNam)
    }
  }
}
