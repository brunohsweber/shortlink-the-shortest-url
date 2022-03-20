import { ICreateUrlDTO } from "@modules/shortlink/dtos/ICreateUrlDTO";
import { IUrlDTO } from "@modules/shortlink/dtos/IUrlDTO";
import { IUrlsRepository } from "@modules/shortlink/repositories/IUrlsRepository";
import { prisma } from "@shared/infra/prisma/prismaClient";

class UrlsRepository implements IUrlsRepository {

  private repository = prisma.urls;

  public async create({ url, codeShortUrl }: ICreateUrlDTO): Promise<string> {

    const result = await this.repository.create({
      data: {
        url: url,
        short_url: codeShortUrl
      }
    })

    return result.short_url
  }

  public async findByShortUrl(codeShortUrl: string): Promise<IUrlDTO | undefined> {
    const result = await this.repository.findUnique({
      where: {
        short_url: codeShortUrl
      }
    })

    return result
  }

  public async findByUrl(url: string): Promise<IUrlDTO | undefined> {
    const result = await this.repository.findUnique({
      where: {
        url: url
      }
    })

    return result
  }
}

export { UrlsRepository };