import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder as Builder } from '@/validation/validators/validation-builder/validation-builder'

export const makeSignupValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...Builder.field('name').require().min(5).build(),
    ...Builder.field('email').require().email().build(),
    ...Builder.field('password').require().min(5).build(),
    ...Builder.field('passwordConfirmation').require().compare('password').build()
  ])
}
