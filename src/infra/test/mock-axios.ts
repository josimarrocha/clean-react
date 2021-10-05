import axios from 'axios'
import faker from 'faker'

export const mockHttpResponse = (): any => ({
  data: faker.random.objectElement(),
  status: faker.datatype.number()
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxions = axios as jest.Mocked<typeof axios>
  mockedAxions.post.mockResolvedValue(mockHttpResponse())
  return mockedAxions
}
