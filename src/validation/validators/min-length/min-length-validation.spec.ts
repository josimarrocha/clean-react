import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'
import faker from 'faker'

const makeSut = (field: string): MinLengthValidation => new MinLengthValidation(field, 5)

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const field = faker.name.findName()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.datatype.string(3) })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if value is valid', () => {
    const field = faker.name.findName()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.datatype.string(5) })
    expect(error).toBeFalsy()
  })

  test('Should return falsy if field does not exists in schema', () => {
    const field = faker.name.findName()
    const sut = makeSut(field)
    const error = sut.validate({ [faker.database.column()]: faker.datatype.string(5) })
    expect(error).toBeFalsy()
  })
})
