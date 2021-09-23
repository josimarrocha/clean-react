import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class MinLengthValidation implements FieldValidation {
  filed: string
  constructor(readonly field: string, private readonly minLength: number) { }

  validate(value: string): Error | null {
    return new InvalidFieldError()
  }
}