import { AppError } from "@shared/errors/AppError";

export class URLAlreadyEncodedError extends AppError {
  constructor() {
    super("URL already encoded!");
  }
}
