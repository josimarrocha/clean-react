import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder } from '@/validation/validators/validation-builder/validation-builder'

export const makeLoginValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('email').require().email().build(),
    ...ValidationBuilder.field('password').require().min(5).build()
  ])
}
