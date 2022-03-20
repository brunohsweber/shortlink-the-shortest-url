import { IUrlsRepository } from "@modules/shortlink/repositories/IUrlsRepository";
import { inject, injectable } from "tsyringe";
import { UrlNotFoundError } from "./UrlNotFoundError";

@injectable()
class DecodeUrlUseCase {

  private decode = (url: String) => url.split("/").pop() // get the last part of the Url

  constructor(
    @inject("UrlsRepository")
    private urlsRepository: IUrlsRepository
  ) { }

  public async execute(url: string): Promise<string> {

    const shortUrl = this.decode(url)

    const urlFound = await this.urlsRepository.findByShortUrl(shortUrl);

    if (!urlFound) {
      throw new UrlNotFoundError()
    }

    return urlFound.url;
  }
}

export { DecodeUrlUseCase }