import { HttpPostClient, HttpsStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domains/errors'
import { AccountModel } from '@/domains/models'
import { Authentication, AuthenticationParams } from '@/domains/usecases'

export class RemoteAuthentication implements Authentication {
  // recebe a url e o client(axios/fetch/outros)
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>) { }

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({ url: this.url, body: params })
    switch (httpResponse.statusCode) {
      case HttpsStatusCode.success: return httpResponse.body
      case HttpsStatusCode.unauthorized: throw new InvalidCredentialsError()

      default: throw new UnexpectedError()
    }
  }
}
