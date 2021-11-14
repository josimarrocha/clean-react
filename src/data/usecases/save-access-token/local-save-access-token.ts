import { SetStorage } from '@/data/protocols/cache/set-storage'
import { UnexpectedError } from '@/domains/errors'
import { SaveAccessToken } from '@/domains/usecases/save-access-token'

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor(private readonly setStorage: SetStorage) { }
  async save(accessToken: string | undefined): Promise<void> {
    if (!accessToken) throw new UnexpectedError()
    this.setStorage.set('accessToken', accessToken)
  }
}
