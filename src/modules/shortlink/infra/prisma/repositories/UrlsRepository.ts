import { IUrlsRepository } from "@modules/shortlink/repositories/IUrlsRepository";
import { GenerateCode } from "@modules/shortlink/utils/GenerateCode";
import { prisma } from "@shared/infra/prisma/prismaClient";

class UrlsRepository implements IUrlsRepository {

  private repository = prisma.urls;
  private generateCode = new GenerateCode();

  constructor() { }

  public async encode(url: string, encodedUrl: string): Promise<String> {

    const result = await this.repository.create({
      data: {
        url: url,
        short_url: encodedUrl
      }
    })

    return result.short_url
  }

  public async findByUrl(url: string): Promise<String | undefined> {
    const result = await this.repository.findFirst({
      where: {
        url: {
          equals: url
        }
      }
    })

    return result?.short_url
  }

  public async decode(url: string): Promise<String> {
    throw new Error("Method not implemented.");
  }
}

export { UrlsRepository };