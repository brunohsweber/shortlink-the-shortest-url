import { Url } from "@modules/shortlink/infra/prisma/entities/Url";
import { GenerateCode } from "@modules/shortlink/utils/GenerateCode";
import { inject, injectable } from "tsyringe";
import { IUrlsRepository } from "../IUrlsRepository";

@injectable()
class UrlsRepositoryInMemory implements IUrlsRepository {

  urls = []

  constructor(
    @inject("GenerateCode")
    private generateCode: GenerateCode
  ) { }

  public async encode(url: string): Promise<String> {
    const urlObj = {}

    const shortUrl = this.generateCode.get();

    Object.assign(urlObj, {
      url,
      short_url: shortUrl
    })

    this.urls.push(urlObj)

    return this.urls[this.urls.length - 1].short_url
  }

  public async findByUrl(url: string): Promise<String | undefined> {
    const urlObj = this.urls.find(urlObj => urlObj.url === url)

    return urlObj?.short_url
  }

  public async decode(url: string): Promise<String> {
    throw new Error("Method not implemented.");
  }

}

export { UrlsRepositoryInMemory };