import faker from 'faker'
import { LocalSaveAccessToken } from './local-save-access-token'
import { SetStorageSpy } from '@/data/test/mock-storage'

describe('LocalSaveAccessToken', () => {
  test('Should call SetStorage with correct value', async () => {
    const setStorageSpy = new SetStorageSpy()
    const saveAccessToken = new LocalSaveAccessToken(setStorageSpy)
    const accessToken = faker.datatype.uuid()
    await saveAccessToken.save(accessToken)
    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
