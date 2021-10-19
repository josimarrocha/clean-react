import faker from 'faker'
import { AddAccountParams } from '@/domains/usecases'
import { HttpPostClientSpy } from '@/data/test'
import { AccountModel } from '@/domains/models'
import { RemoteAddAccount } from './remote-add-account'
import { mockAddAccount } from '@/domains/test'
type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AddAccountParams, AccountModel>()
  // sut (system under test) -> objeto que esta sendo testado
  const sut = new RemoteAddAccount(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpClient with corret URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.add(mockAddAccount())
    expect(httpPostClientSpy.url).toBe(url)
  })
})
