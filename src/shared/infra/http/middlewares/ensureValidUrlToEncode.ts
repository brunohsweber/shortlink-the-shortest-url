
import { UrlValidationProvider } from "@shared/container/providers/UrlValidationProvider/implementations/UrlValidationProvider";
import { InvalidUrlToEncodeError } from "@shared/errors/InvalidUrlToEncodeError";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

export async function ensureValidUrlToEncode(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { url } = request.body;

  const urlValidationProvider = container.resolve(UrlValidationProvider);

  const isValidUrlToEncode = await urlValidationProvider.isValidToEncode(url);

  if (!isValidUrlToEncode) {
    throw new InvalidUrlToEncodeError();
  }

  return next();
}
