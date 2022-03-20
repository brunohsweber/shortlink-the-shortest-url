import { URLValidationProvider } from "@shared/container/providers/URLValidationProvider/implementations/URLValidationProvider";
import { InvalidURLToEncodeError } from "@shared/errors/InvalidURLToEncodeError";
import { URLIsRequiredError } from "@shared/errors/URLIsRequiredError";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

export async function ensureValidUrlToEncode(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { url } = request.body;

  if (!url) {
    throw new URLIsRequiredError();
  };

  const urlValidationProvider = container.resolve(URLValidationProvider);

  const isValidURLToEncode = await urlValidationProvider.isValidToEncode(url);

  if (!isValidURLToEncode) {
    throw new InvalidURLToEncodeError();
  }

  return next();
}
