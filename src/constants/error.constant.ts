export enum JWT_ERROR_CODE {
  MissingToken = 400,
  TokenInvalid = 401,
  TokenExpiredError = 403,
  RefreshTokenNotMatching = 404,
}

export enum AUTH_ERROR_CODE {
  Unauthorized = 451,
}
