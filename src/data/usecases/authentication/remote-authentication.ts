import { HttpPostClient } from 'data/protocols/http/http-post-client'

export class RemoteAuthentication {
  // recebe a url e o client(axios/fetch/outros)
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient) { }

  async auth (): Promise<void> {
    await this.httpPostClient.post({ url: this.url })
  }
}
