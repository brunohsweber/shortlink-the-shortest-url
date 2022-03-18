
import { GenerateCode } from "@modules/shortlink/utils/GenerateCode";
import { UrlValidation } from "@modules/shortlink/utils/UrlValidation";
import { AppError } from "@shared/errors/AppError";
import { prisma } from "@shared/infra/prisma/prismaClient";

class EncodeURLUseCase {

  private urlValidation: UrlValidation;
  private generateCode: GenerateCode;

  constructor() {
    this.urlValidation = new UrlValidation()
    this.generateCode = new GenerateCode()
  }

  public async execute(url: string): Promise<String> {

    const isValidUrl = await this.urlValidation.validate(url);

    if (!isValidUrl) throw new AppError("Invalid URL");

    const encodedUrl = `http://localhost:3000/${await this.generateCode.get()}`;

    return encodedUrl;
  }
}

export { EncodeURLUseCase };