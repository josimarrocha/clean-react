import faker from 'faker'
import { EmailValidation, RequiredFieldValidation, MinLengthValidation, CompareFieldsValidation } from '@/validation/validators'
import { ValidationBuilder as sut } from './validation-builder'

describe('ValidationBuilder', () => {
  test('Should returns RequiredFieldValidation', () => {
    const fieldName = faker.database.column()
    const validations = sut.field(fieldName).require().build()

    expect(validations).toEqual([
      new RequiredFieldValidation(fieldName)
    ])
  })

  test('Should returns EmailValidation', () => {
    const fieldName = faker.database.column()
    const validations = sut.field(fieldName).email().build()

    expect(validations).toEqual([
      new EmailValidation(fieldName)
    ])
  })

  test('Should returns MinLengthValidation', () => {
    const fieldName = faker.database.column()
    const length = faker.datatype.number()
    const validations = sut.field(fieldName).min(length).build()

    expect(validations).toEqual([
      new MinLengthValidation(fieldName, length)
    ])
  })

  test('Should returns CompareFieldsValidation', () => {
    const fieldName = faker.database.column()
    const fieldValue = faker.random.word()
    const validations = sut.field(fieldName).compare(fieldValue).build()

    expect(validations).toEqual([
      new CompareFieldsValidation(fieldName, fieldValue)
    ])
  })

  test('Should returns a list of validations', () => {
    const fieldName = faker.database.column()
    const length = faker.datatype.number()
    const validations = sut.field(fieldName).require().email().min(length).build()

    expect(validations).toEqual([
      new RequiredFieldValidation(fieldName),
      new EmailValidation(fieldName),
      new MinLengthValidation(fieldName, length)
    ])
  })
})
