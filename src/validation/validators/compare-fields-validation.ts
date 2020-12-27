import { Validation } from '../../presentation/protocols'
import { InvalidParamError } from '../../presentation/errors'

export class CompareFieldsValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly fieldToCompareNam: string) { }

  validate (input: any): Error {
    if (input[this.fieldName] !== input[this.fieldToCompareNam]) {
      return new InvalidParamError(this.fieldToCompareNam)
    }
  }
}
