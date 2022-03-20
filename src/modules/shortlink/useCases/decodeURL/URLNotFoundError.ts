import { AppError } from "@shared/errors/AppError";

export class URLNotFoundError extends AppError {
  constructor() {
    super("URL Not Found!");
  }
}
