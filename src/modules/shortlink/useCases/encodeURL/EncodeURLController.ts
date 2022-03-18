import { Request, Response } from "express";
import { container } from "tsyringe";

import { EncodeURLUseCase } from "./EncodeURLUseCase";

class EncodeURLController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { url } = request.body;

    const encodeURLUseCase = container.resolve(EncodeURLUseCase);

    const shortUrl = await encodeURLUseCase.execute(url);

    return response.status(201).json(shortUrl);
  }
}

export { EncodeURLController };