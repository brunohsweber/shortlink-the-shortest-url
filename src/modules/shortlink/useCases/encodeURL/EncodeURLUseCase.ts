
import { GenerateCode } from "@modules/shortlink/utils/GenerateCode";
import { prisma } from "@shared/infra/prisma/prismaClient";

class EncodeURLUseCase {

  public async execute(url: string): Promise<String> {

    const generateCode = new GenerateCode();

    const short_url = await generateCode.get();

    return short_url;
  }
}

export { EncodeURLUseCase };