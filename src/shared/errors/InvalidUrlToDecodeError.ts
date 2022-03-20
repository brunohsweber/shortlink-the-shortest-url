import { AppError } from "@shared/errors/AppError";

export class InvalidUrlToDecodeError extends AppError {
  constructor() {
    super("Invalid url to decode!");
  }
}
