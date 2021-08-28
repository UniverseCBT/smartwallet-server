export class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  public readonly field?: string;

  constructor(message: string, statusCode = 400, field?: string) {
    this.message = message;
    this.statusCode = statusCode;
    this.field = field;
  }
}
