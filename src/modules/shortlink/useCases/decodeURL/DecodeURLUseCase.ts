import { IUrlsRepository } from "@modules/shortlink/repositories/IUrlsRepository";
import { inject, injectable } from "tsyringe";
import { URLNotFoundError } from "./URLNotFoundError";

@injectable()
class DecodeURLUseCase {

  constructor(
    @inject("UrlsRepository")
    private urlsRepository: IUrlsRepository
  ) { }

  async execute(url: string): Promise<String> {

    const urlFound = await this.urlsRepository.findByShortUrl(url);

    if (!urlFound) {
      throw new URLNotFoundError()
    }

    return url
  }
}

export { DecodeURLUseCase }