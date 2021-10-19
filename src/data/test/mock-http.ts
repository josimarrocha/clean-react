import faker from 'faker'
import { HttpPostClient, HttpPostParams, HttpResponse, HttpsStatusCode } from '@/data/protocols/http'

// simulate axios/fetch/outros (httpClient)
export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string
  body?: T
  response: HttpResponse<R> = {
    statusCode: HttpsStatusCode.success
  }

  async post(params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body
    return this.response
  }
}

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})
