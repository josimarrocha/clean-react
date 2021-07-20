import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { HttpsStatusCode } from '@/data/protocols/http/http-response'
import { InvalidCredentialsError } from '@/domains/errors/invalid-credentials-error'
import { UnexpectedError } from '@/domains/errors/unexpected-error'
import { AccountModel } from '@/domains/models/account-model'
import { Authentication, AuthenticationParams } from '@/domains/usecases/authentication'

export class RemoteAuthentication implements Authentication {
  // recebe a url e o client(axios/fetch/outros)
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>) { }

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({ url: this.url, body: params })
    switch (httpResponse.statusCode) {
      case HttpsStatusCode.success: return httpResponse.body
      case HttpsStatusCode.unathorized: throw new InvalidCredentialsError()

      default: throw new UnexpectedError()
    }
  }
}
