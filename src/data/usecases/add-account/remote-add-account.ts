import { HttpPostClient, HttpsStatusCode } from '@/data/protocols/http'
import { EmailInUseError } from '@/domains/errors'
import { AccountModel } from '@/domains/models'
import { AddAccountParams, AddAccount } from '@/domains/usecases'

export class RemoteAddAccount implements AddAccount {
  // recebe a url e o client(axios/fetch/outros)
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AddAccountParams, AccountModel>) { }

  async add(params: AddAccountParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({ url: this.url, body: params })
    switch (httpResponse.statusCode) {
      case HttpsStatusCode.forbidden: throw new EmailInUseError()
      default: return await Promise.resolve({ accessToken: 'pass' })
    }
  }
}
