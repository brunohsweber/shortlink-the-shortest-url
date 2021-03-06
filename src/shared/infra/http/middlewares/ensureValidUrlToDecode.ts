
import { UrlValidationProvider } from "@shared/container/providers/UrlValidationProvider/implementations/UrlValidationProvider";
import { InvalidUrlToDecodeError } from "@shared/errors/InvalidUrlToDecodeError";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

export async function ensureValidUrlToDecode(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { url } = request.body;

  const urlValidationProvider = container.resolve(UrlValidationProvider);

  const isValidUrlToDecode = await urlValidationProvider.isValidToDecode(url);

  if (!isValidUrlToDecode) {
    throw new InvalidUrlToDecodeError();
  }

  return next();
}