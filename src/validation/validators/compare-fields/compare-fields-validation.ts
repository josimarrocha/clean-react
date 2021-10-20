import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly valueToCompare: string
  ) { }

  filed: string

  validate(value: string): Error | null {
    return new InvalidFieldError()
  }
}
