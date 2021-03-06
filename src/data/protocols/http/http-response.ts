export enum HttpsStatusCode {
  success = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,

}

export type HttpResponse<T> = {
  statusCode: HttpsStatusCode
  body?: T | any
}
