import { IUrlsRepository } from "@modules/shortlink/repositories/IUrlsRepository";
import { UrlValidationProvider } from "@shared/container/providers/UrlValidationProvider/implementations/UrlValidationProvider";
import { inject, injectable } from "tsyringe";
import { InvalidURLToDecodeError } from "./InvalidURLToDecodeError";
import { URLNotFoundError } from "./URLNotFoundError";

@injectable()
class DecodeURLUseCase {

  constructor(
    @inject("UrlValidation")
    private urlValidation: UrlValidationProvider,
    @inject("UrlsRepository")
    private urlsRepository: IUrlsRepository
  ) { }

  async execute(url: string): Promise<String> {

    const isValidUrlToDecode = await this.urlValidation.isValidToDecode(url);

    if (!isValidUrlToDecode) {
      throw new InvalidURLToDecodeError();
    }

    const urlFound = await this.urlsRepository.findByShortUrl(url);

    if (!urlFound) {
      throw new URLNotFoundError()
    }

    return url
  }
}

export { DecodeURLUseCase }