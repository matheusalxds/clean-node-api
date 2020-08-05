import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-fied-validation'
import { Validation } from '../../presentation/helpers/validators/validation'
import { CompareFieldsValidation } from '../../presentation/helpers/validators/compare-fieds-validation'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { EmailValidation } from '../../presentation/helpers/validators/email-validation'

export const makeSignValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
