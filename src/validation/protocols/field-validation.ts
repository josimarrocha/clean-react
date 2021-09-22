export interface FieldValidation {
  filed: string
  validate: (value: string) => Error
}
