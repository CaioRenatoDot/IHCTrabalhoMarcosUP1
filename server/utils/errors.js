export class AppError extends Error {
  constructor(statusCode, message, details = null) {
    super(message)
    this.name = 'AppError'
    this.statusCode = statusCode
    this.details = details
  }
}

export function assertAuthenticated(userId) {
  if (!userId) {
    throw new AppError(401, 'Autenticação necessária.')
  }
}
