import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder as Builder } from '@/validation/validators/validation-builder/validation-builder'
import { makeSignupValidation } from './signup-validation-factory'

describe('SignupValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const validation = makeSignupValidation()
    expect(validation).toEqual(ValidationComposite.build([
      ...Builder.field('name').require().min(5).build(),
      ...Builder.field('email').require().email().build(),
      ...Builder.field('password').require().min(5).build(),
      ...Builder.field('passwordConfirmation').require().min(5).build()
    ]))
  })
})
