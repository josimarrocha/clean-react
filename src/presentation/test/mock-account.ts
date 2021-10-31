import { AccountModel } from '@/domains/models'
import { mockAccountModel } from '@/domains/test'
import { AddAccount, AddAccountParams } from '@/domains/usecases'

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel()
  params: AddAccountParams
  callsCont = 0

  async add(params: AddAccountParams): Promise<AccountModel> {
    this.params = params
    this.callsCont++
    return this.account
  }
}
