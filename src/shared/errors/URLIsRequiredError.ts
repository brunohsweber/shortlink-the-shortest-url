import { AppError } from "@shared/errors/AppError";

export class URLIsRequiredError extends AppError {
  constructor() {
    super("URL is required!");
  }
}
