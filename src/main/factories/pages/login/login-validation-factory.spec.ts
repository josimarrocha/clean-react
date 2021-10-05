import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder } from '@/validation/validators/validation-builder/validation-builder'
import { makeLoginValidation } from './login-validation-factory'

describe('LoginValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const validation = makeLoginValidation()
    expect(validation).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field('email').require().email().build(),
      ...ValidationBuilder.field('password').require().min(5).build()
    ]))
  })
})
