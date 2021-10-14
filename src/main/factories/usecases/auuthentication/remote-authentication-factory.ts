
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { makeAxionsHttpClient } from '@/main/factories/http/axios-http-client-factory'
import { Authentication } from '@/domains/usecases'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeApiUrl('/login'), makeAxionsHttpClient())
}
