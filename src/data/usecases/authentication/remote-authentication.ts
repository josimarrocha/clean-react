import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { AuthenticationParams } from '@/domains/usecases/authentication'

export class RemoteAuthentication {
  // recebe a url e o client(axios/fetch/outros)
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient) { }

  async auth (params: AuthenticationParams): Promise<void> {
    await this.httpPostClient.post({ url: this.url, body: params })
  }
}
