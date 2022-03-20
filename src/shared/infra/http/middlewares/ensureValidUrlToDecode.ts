import { URLValidationProvider } from "@shared/container/providers/URLValidationProvider/implementations/URLValidationProvider";
import { InvalidURLToDecodeError } from "@shared/errors/InvalidURLToDecodeError";
import { URLIsRequiredError } from "@shared/errors/URLIsRequiredError";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

export async function ensureValidUrlToDecode(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { url } = request.body;

  if (!url) {
    throw new URLIsRequiredError();
  };

  const urlValidationProvider = container.resolve(URLValidationProvider);

  const isValidURLToDecode = await urlValidationProvider.isValidToDecode(url);

  if (!isValidURLToDecode) {
    throw new InvalidURLToDecodeError();
  }

  return next();
}