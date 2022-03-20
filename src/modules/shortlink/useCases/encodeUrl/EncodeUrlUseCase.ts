import { IUrlsRepository } from "@modules/shortlink/repositories/IUrlsRepository";
import { IGenerateCodeShortUrlProvider } from "@shared/container/providers/GenerateCodeShortUrlProvider/IGenerateCodeShortUrlProvider";
import { GenerateCodeShortUrlProvider } from "@shared/container/providers/GenerateCodeShortUrlProvider/implementations/GenerateCodeShortUrlProvider";
import { container, inject, injectable } from "tsyringe";

@injectable()
class EncodeUrlUseCase {

  private HOST = process.env.HOST || "http://localhost:3000"
  private encode = (shortUrl: String) => `${this.HOST}/${shortUrl}`

  constructor(
    @inject("UrlsRepository")
    private urlsRepository: IUrlsRepository,
    @inject(GenerateCodeShortUrlProvider)
    private generateCodeShortUrlProvider: IGenerateCodeShortUrlProvider
  ) { }

  public async execute(url: string): Promise<string> {

    const urlAlreadyExist = await this.urlsRepository.findByUrl(url)

    if (urlAlreadyExist) {
      return this.encode(urlAlreadyExist.short_url)
    }

    if (!urlAlreadyExist) {

      let codeShortUrlAlreadyExistInDatabase: boolean = true

      let codeShortUrl = ""

      do {

        codeShortUrl = await this.generateCodeShortUrlProvider.generate()

        const result = await this.urlsRepository.findByShortUrl(codeShortUrl)

        codeShortUrlAlreadyExistInDatabase = !!result

      } while (codeShortUrlAlreadyExistInDatabase);

      const result = await this.urlsRepository.create({ url, codeShortUrl });

      return this.encode(result.short_url);
    }
  }
}

export { EncodeUrlUseCase };