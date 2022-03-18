import { ICreateUrlDTO } from "@modules/shortlink/dtos/ICreateUrlDTO";
import { Url } from "@modules/shortlink/infra/prisma/entities/Url";
import { IUrlsRepository } from "../IUrlsRepository";

class UrlsRepositoryInMemory implements IUrlsRepository {

  urls: Url[] = []

  public async create({ url, shortUrl }: ICreateUrlDTO): Promise<String> {

    this.urls.push({
      id: `uuid${this.urls.length + 1}`,
      url: url,
      short_url: shortUrl,
      created_at: Date.now()
    })

    return this.urls[this.urls.length - 1].short_url
  }

  public async findByUrl(url: String): Promise<String | undefined> {
    const result = this.urls.find(obj => obj.url === url)

    return result.short_url
  }

  public async findByShortUrl(shortUrl: String): Promise<String | undefined> {
    const result = await this.urls.find(obj => obj.short_url === shortUrl)

    return result
  }

}

export { UrlsRepositoryInMemory };