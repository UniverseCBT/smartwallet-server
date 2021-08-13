export class AppError {
  public readonly message: string;

  public readonly field?: string;

  public readonly statusCode: number;

  constructor(message: string, field?: string, statusCode = 400) {
    this.message = message;
    this.field = field;
    this.statusCode = statusCode;
  }
}
