import { IUrlsRepository } from "@modules/shortlink/repositories/IUrlsRepository";
import { GenerateCode } from "@modules/shortlink/utils/GenerateCode";
import { UrlValidation } from "@modules/shortlink/utils/UrlValidation";
import { inject, injectable } from "tsyringe";
import { InvalidURLError } from "./InvalidURLError";
import { URLAlreadyEncodedError } from "./URLAlreadyEncodedError";

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

    const hasURLEncoded = await this.urlsRepository.findByUrl(url);

    if (hasURLEncoded) {
      return hasURLEncoded
    } else {
      const encodedURL = `http://localhost:3000/${await this.generateCode.get()}`;

      return await this.urlsRepository.encode(url, encodedURL);
    }

  }
}

export { EncodeURLUseCase };