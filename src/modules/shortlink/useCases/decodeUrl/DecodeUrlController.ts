import { Request, Response } from "express";
import { container } from "tsyringe";
import { DecodeUrlUseCase } from "./DecodeUrlUseCase";

class DecodeUrlController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { url } = request.body;

    const decodeUrlUseCase = container.resolve(DecodeUrlUseCase);

    const urlDecoded = await decodeUrlUseCase.execute(url);

    return response.status(200).json({ urlDecoded });
  }
}

export { DecodeUrlController };