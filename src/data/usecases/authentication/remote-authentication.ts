import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { HttpsStatusCode } from '@/data/protocols/http/http-response'
import { InvalidCredentialsError } from '@/domains/errors/invalid-credentials-error'
import { UnexpectedError } from '@/domains/errors/unexpected-error'
import { AccountModel } from '@/domains/models/account-model'
import { AuthenticationParams } from '@/domains/usecases/authentication'

export class RemoteAuthentication {
  // recebe a url e o client(axios/fetch/outros)
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>) { }

  async auth (params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({ url: this.url, body: params })
    switch (httpResponse.statusCode) {
      case HttpsStatusCode.success: break
      case HttpsStatusCode.unathorized: throw new InvalidCredentialsError()

      default: throw new UnexpectedError()
    }
  }
}
