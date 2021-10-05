import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'

export const makeAxionsHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}
