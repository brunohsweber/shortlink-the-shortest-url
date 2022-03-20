import { ICreateUrlDTO } from "@modules/shortlink/dtos/ICreateUrlDTO";
import { IUrlsRepository } from "@modules/shortlink/repositories/IUrlsRepository";
import { prisma } from "@shared/infra/prisma/prismaClient";
import { Url } from "../entities/Url";

class UrlsRepository implements IUrlsRepository {

  private repository = prisma.urls;

  public async create({ url, codeShortUrl }: ICreateUrlDTO): Promise<Url> {

    const result = await this.repository.create({
      data: {
        url: url,
        short_url: codeShortUrl
      }
    })

    return result
  }

  public async findByShortUrl(codeShortUrl: string): Promise<Url | undefined> {
    const result = await this.repository.findUnique({ where: { short_url: codeShortUrl } })

    return result
  }

  public async findByUrl(url: string): Promise<Url | undefined> {
    const result = await this.repository.findUnique({ where: { url: url } })

    return result
  }
}

export { UrlsRepository };