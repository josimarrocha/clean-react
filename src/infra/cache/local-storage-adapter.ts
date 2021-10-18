
import { SetStorage } from '@/data/protocols/cache/set-storage'
import 'jest-localstorage-mock'

export class LocalStorageAdapter implements SetStorage {
  async set(key: string, value: any): Promise<void> {
    localStorage.setItem(key, value)
  }
}
