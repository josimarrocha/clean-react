
import { RemoteAddAccount } from '@/data/usecases/add-account/remote-add-account'
import { makeAxionsHttpClient } from '@/main/factories/http/axios-http-client-factory'
import { AddAccount } from '@/domains/usecases'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'

export const makeRemoteAddAccount = (): AddAccount => {
  return new RemoteAddAccount(makeApiUrl('/signup'), makeAxionsHttpClient())
}
