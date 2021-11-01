import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly fieldToCompare: string
  ) { }

  filed: string

  validate(input: object): Error | null {
    return input[this.field] !== input[this.fieldToCompare] ? new InvalidFieldError() : null
  }
}
