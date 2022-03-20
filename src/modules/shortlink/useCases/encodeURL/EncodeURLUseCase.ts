import { IUrlsRepository } from "@modules/shortlink/repositories/IUrlsRepository";
import { GenerateCodeShortURLProvider } from "@shared/container/providers/GenerateCodeShortURLProvider/implementations/GenerateCodeShortURLProvider";
import { UrlValidationProvider } from "@shared/container/providers/UrlValidationProvider/implementations/UrlValidationProvider";
import { inject, injectable } from "tsyringe";
import { InvalidURLToEncodeError } from "./InvalidURLToEncodeError";

@injectable()
class EncodeURLUseCase {

  constructor(
    @inject("UrlValidation")
    private urlValidation: UrlValidationProvider,
    @inject("GenerateCodeShortUrl")
    private generateCodeShortUrl: GenerateCodeShortURLProvider,
    @inject("UrlsRepository")
    private urlsRepository: IUrlsRepository
  ) {
  }

  public async execute(url: string): Promise<String> {

    const isValidURLToEncode = await this.urlValidation.isValidToEncode(url);

    if (!isValidURLToEncode) {
      throw new InvalidURLToEncodeError();
    }

    const urlAlreadyExist = await this.urlsRepository.findByUrl(url)

    const HOST = process.env.HOST || "http://localhost:3000"

    const encodeURL = (shortUrl: String) => `${HOST}/${shortUrl}`

    if (!urlAlreadyExist) {

      const codeShortUrl = await this.generateCodeShortUrl.generate();

      const result = await this.urlsRepository.create({ url, codeShortUrl });

      const urlEncoded = encodeURL(result);

      return urlEncoded;
    }

    const urlEncoded = encodeURL(urlAlreadyExist.short_url);

    return urlEncoded;


  }
}

export { EncodeURLUseCase };