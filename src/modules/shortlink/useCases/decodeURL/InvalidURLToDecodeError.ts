import { AppError } from "@shared/errors/AppError";

export class InvalidURLToDecodeError extends AppError {
  constructor() {
    super("Invalid URL to Decode!");
  }
}
