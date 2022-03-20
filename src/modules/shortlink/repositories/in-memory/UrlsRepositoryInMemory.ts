import { ICreateUrlDTO } from "@modules/shortlink/dtos/ICreateUrlDTO";
import { IUrlDTO } from "@modules/shortlink/dtos/IUrlDTO";
import { Url } from "@modules/shortlink/infra/prisma/entities/Url";
import { IUrlsRepository } from "../IUrlsRepository";

class UrlsRepositoryInMemory implements IUrlsRepository {

  urls: Url[] = []

  public async create({ url, codeShortUrl }: ICreateUrlDTO): Promise<string> {

    this.urls.push({
      id: `uuid${this.urls.length + 1}`,
      url: url,
      short_url: codeShortUrl,
      created_at: new Date(Date.now())
    })

    return this.urls[this.urls.length - 1].short_url
  }

  public async findByUrl(url: String): Promise<IUrlDTO | undefined> {
    const result = this.urls.find(obj => obj.url === url)

    return result
  }

  public async findByShortUrl(codeShortUrl: String): Promise<IUrlDTO | undefined> {
    const result = this.urls.find(obj => obj.short_url === codeShortUrl)

    return result
  }

}

export { UrlsRepositoryInMemory };