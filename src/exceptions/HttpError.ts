export class HttpError extends Error {
  public readonly code: number;

  public constructor(message: string, code = 500) {
    super(message);

    this.code = code;
  }
}
