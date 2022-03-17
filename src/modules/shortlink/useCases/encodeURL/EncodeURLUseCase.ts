
import { GenerateCode } from "@modules/shortlink/utils/GenerateCode";
import { prisma } from "@shared/infra/prisma/prismaClient";

class EncodeURLUseCase {

  public async execute(url: string): Promise<String> {

    const generateCode = new GenerateCode();

    let short_url = "http://localhost:3000/" + await generateCode.get();

    console.log(short_url)

    return short_url;
  }
}

export { EncodeURLUseCase };