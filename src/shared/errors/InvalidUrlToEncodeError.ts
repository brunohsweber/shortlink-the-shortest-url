import { AppError } from "@shared/errors/AppError";

export class InvalidUrlToEncodeError extends AppError {
  constructor() {
    super("Invalid url to encode!");
  }
}
