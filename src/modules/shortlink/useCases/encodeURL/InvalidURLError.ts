import { AppError } from "@shared/errors/AppError";

export class InvalidURLError extends AppError {
  constructor() {
    super("Invalid URL!");
  }
}
