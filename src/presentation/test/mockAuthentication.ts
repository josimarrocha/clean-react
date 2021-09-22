import { AccountModel } from '@/domains/models'
import { mockAccountModel } from '@/domains/test'
import { Authentication, AuthenticationParams } from '@/domains/usecases'

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: AuthenticationParams
  callsCont = 0

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    this.callsCont++
    return await Promise.resolve(this.account)
  }
}
