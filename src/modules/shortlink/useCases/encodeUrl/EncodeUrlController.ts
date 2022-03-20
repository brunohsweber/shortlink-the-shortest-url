import { Request, Response } from "express";
import { container } from "tsyringe";
import { EncodeUrlUseCase } from "./EncodeUrlUseCase";

class EncodeUrlController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { url } = request.body;

    const encodeUrlUseCase = container.resolve(EncodeUrlUseCase);

    const urlEncoded = await encodeUrlUseCase.execute(url);

    return response.status(200).json({ urlEncoded });
  }
}

export { EncodeUrlController };