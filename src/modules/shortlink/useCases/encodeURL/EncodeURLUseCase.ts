
import { GenerateCode } from "@modules/shortlink/utils/GenerateCode";
import { AppError } from "@shared/errors/AppError";
import { prisma } from "@shared/infra/prisma/prismaClient";

class EncodeURLUseCase {

  public async execute(url: string): Promise<String> {

    if (url === "batatinhafrita123") throw new AppError("Invalid URL");

    const generateCode = new GenerateCode();

    let short_url = "http://localhost:3000/" + await generateCode.get();

    return short_url;
  }
}

export { EncodeURLUseCase };