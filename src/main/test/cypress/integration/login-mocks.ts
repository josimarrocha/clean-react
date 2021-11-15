import faker from 'faker'
import * as Helper from '../support/http-mocks'

export const mockInvalidCredentials = (): void => Helper.mockInvalidCredentials(/login/)
export const mockUnexpectedError = (): void => Helper.mockUnexpectedError(/login/, 'POST')
export const mockDataInvalid = (): void => Helper.mockOk(/login/, 'POST', { invalid: faker.datatype.uuid() })
export const mockOk = (): void => Helper.mockOk(/login/, 'POST', { accessToken: faker.datatype.uuid() })
