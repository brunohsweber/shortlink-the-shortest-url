import { AppError } from "@shared/errors/AppError";

export class UrlNotFoundError extends AppError {
  constructor() {
    super("Url not found!");
  }
}
