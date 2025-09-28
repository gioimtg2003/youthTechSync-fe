export enum JWT_ERROR_CODE {
  MissingToken = 400,
  TokenInvalid = 401,
  TokenExpiredError = 403,
  RefreshTokenNotMatching = 404,
}

/** *****************User***************** */
export enum UserError {
  USER_NOT_FOUND = 100,
  USER_REACHES_CREATE_TEAM_LIMIT = 101,
  USER_CANNOT_CREATE = 102,
  USER_REACHES_JOIN_TEAM_LIMIT = 103,
  USER_CANNOT_JOIN_TEAM = 104,
  USER_CANNOT_LEAVE_TEAM = 105,
}

/** *****************End***************** */

/** *****************Team***************** */

export enum TeamError {
  TEAM_NOT_FOUND = 200,
}

export enum AUTH_ERROR_CODE {
  AUTH_INVALID_CREDENTIALS = 300,
  AUTH_INVALID_SESSION = 301,
  NOT_AUTHORIZED = 302,
}

export enum SystemError {
  INTERNAL_SERVER_ERROR = 500,
}
