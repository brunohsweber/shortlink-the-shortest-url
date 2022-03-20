import { AppError } from "@shared/errors/AppError";

export class InvalidURLToEncodeError extends AppError {
  constructor() {
    super("Invalid URL to Encode!");
  }
}
