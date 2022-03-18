import { IUrlsRepository } from "@modules/shortlink/repositories/IUrlsRepository";
import { GenerateCode } from "@modules/shortlink/utils/GenerateCode";
import { UrlValidation } from "@modules/shortlink/utils/UrlValidation";
import { inject, injectable } from "tsyringe";
import { InvalidURLError } from "./InvalidURLError";

@injectable()
class EncodeURLUseCase {

  constructor(
    @inject("UrlValidation")
    private urlValidation: UrlValidation,
    @inject("GenerateCode")
    private generateCode: GenerateCode,
    @inject("UrlsRepository")
    private urlsRepository: IUrlsRepository
  ) { }

  public async execute(url: string): Promise<String> {

    const isValidUrl = await this.urlValidation.validate(url);

    if (!isValidUrl) throw new InvalidURLError();

    const urlAlreadyExist = await this.urlsRepository.findByUrl(url)

    const encodeURL = (shortUrl: String) => `http://localhost:3000/${shortUrl}`;

    if (!urlAlreadyExist) {

      const shortUrl = await this.generateCode.get();

      const result = await this.urlsRepository.create({ url, shortUrl });

      const urlEncoded = encodeURL(result);

      return urlEncoded;
    }

    const urlEncoded = encodeURL(urlAlreadyExist.short_url);

    return urlEncoded;


  }
}

export { EncodeURLUseCase };