
import { UrlIsRequiredError } from "@shared/errors/UrlIsRequiredError";
import { NextFunction, Request, Response } from "express";

export async function ensureUrlExists(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { url } = request.body;

  if (!url) {
    throw new UrlIsRequiredError();
  };

  return next();
}