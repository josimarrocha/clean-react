import { HttpPostClient, HttpPostParams } from '@/data/protocols/http/http-post-client'
import { HttpResponse, HttpsStatusCode } from '@/data/protocols/http/http-response'

// simulate axios/fetch/outros (httpClient)
export class HttpPostClientSpy<T, R> implements HttpPostClient <T, R> {
  url?: string
  body?: T
  response: HttpResponse<R> = {
    statusCode: HttpsStatusCode.success
  }

  async post (params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body
    return await Promise.resolve(this.response)
  }
}
