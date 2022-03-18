import { Url } from "@modules/shortlink/infra/prisma/entities/Url";
import { GenerateCode } from "@modules/shortlink/utils/GenerateCode";
import { inject, injectable } from "tsyringe";
import { IUrlsRepository } from "../IUrlsRepository";

@injectable()
class UrlsRepositoryInMemory implements IUrlsRepository {

  urls = []

  constructor(
  ) { }

  public async encode(url: String, encodedUrl: String): Promise<String> {
    const urlObj = {}

    Object.assign(urlObj, {
      url,
      short_url: encodedUrl
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