import { AppError } from "@shared/errors/AppError";

export class UrlIsRequiredError extends AppError {
  constructor() {
    super("Url is required!");
  }
}
