export class HttpError extends Error {
  public readonly code: number;
  public readonly info: object | null;
  public readonly headers: object;

  public constructor(message: string, code = 500, info: object | null = null, headers = {}) {
    super(message);

    this.code = code;
    this.info = info;
    this.headers = headers;
  }
}
