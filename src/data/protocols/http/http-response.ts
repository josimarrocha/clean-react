export enum HttpsStatusCode {
  noContent = 204,
  unathorized = 401
}

export type HttpResponse = {
  statusCode: HttpsStatusCode
  body?: any
}
