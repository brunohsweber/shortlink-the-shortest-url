import { Url } from "@modules/shortlink/infra/prisma/entities/Url";
import { GenerateCode } from "@modules/shortlink/utils/GenerateCode";
import { Urls } from "@prisma/client";
import { IUrlsRepository } from "../IUrlsRepository";

class UrlsRepositoryInMemory implements IUrlsRepository {

  urls = []

  public async encode(url: string): Promise<String> {
    const urlObj = {}

    const generateCode = new GenerateCode();

    const shortUrl = await generateCode.get();

    Object.assign(urlObj, {
      url,
      short_url: shortUrl
    })

    this.urls.push(urlObj)

    return shortUrl;
  }

  public async decode(url: string): Promise<String> {
    throw new Error("Method not implemented.");
  }

}

export { UrlsRepositoryInMemory };