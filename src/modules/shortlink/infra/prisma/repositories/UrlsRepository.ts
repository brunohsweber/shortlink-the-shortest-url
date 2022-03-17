import { IUrlsRepository } from "@modules/shortlink/repositories/IUrlsRepository";
import { GenerateCode } from "@modules/shortlink/utils/GenerateCode";
import { prisma } from "@shared/infra/prisma/prismaClient";

class UrlsRepository implements IUrlsRepository {

  private repository = prisma.urls;

  constructor() {
    this.repository = prisma.urls;
  }

  public async encode(url: string): Promise<String> {

    const generateCode = new GenerateCode();

    const shortUrl = await generateCode.get();

    const result = await this.repository.create({
      data: {
        url: url,
        short_url: shortUrl
      }
    })

    return result.short_url
  }

  public async decode(url: string): Promise<String> {
    throw new Error("Method not implemented.");
  }
}

export { UrlsRepository };