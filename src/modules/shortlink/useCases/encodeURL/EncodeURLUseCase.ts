import { IUrlsRepository } from "@modules/shortlink/repositories/IUrlsRepository";
import { IGenerateCodeShortURLProvider } from "@shared/container/providers/GenerateCodeShortURLProvider/IGenerateCodeShortURLProvider";
import { inject, injectable } from "tsyringe";

@injectable()
class EncodeURLUseCase {

  constructor(
    @inject("UrlsRepository")
    private urlsRepository: IUrlsRepository,
    @inject("GenerateCodeShortURLProvider")
    private generateCodeShortURLProvider: IGenerateCodeShortURLProvider
  ) { }

  public async execute(url: string): Promise<String> {

    const urlAlreadyExist = await this.urlsRepository.findByUrl(url)

    const HOST = process.env.HOST || "http://localhost:3000"

    const encodeURL = (shortUrl: String) => `${HOST}/${shortUrl}`

    if (!urlAlreadyExist) {

      const codeShortUrl = await this.generateCodeShortURLProvider.generate();

      const result = await this.urlsRepository.create({ url, codeShortUrl });

      const urlEncoded = encodeURL(result);

      return urlEncoded;
    }

    const urlEncoded = encodeURL(urlAlreadyExist.short_url);

    return urlEncoded;


  }
}

export { EncodeURLUseCase };