import { HttpPostClient } from '@/data/protocols/http'
import { AccountModel } from '@/domains/models'
import { AddAccountParams, AddAccount } from '@/domains/usecases'

export class RemoteAddAccount implements AddAccount {
  // recebe a url e o client(axios/fetch/outros)
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AddAccountParams, AccountModel>) { }

  async add(params: AddAccountParams): Promise<AccountModel> {
    await this.httpPostClient.post({ url: this.url, body: params })
    return await Promise.resolve({ accessToken: 'pass' })
  }
}
