import { IGenerateCodeShortUrlProvider } from "../IGenerateCodeShortUrlProvider";

class GenerateCodeShortUrlProvider implements IGenerateCodeShortUrlProvider {

  private code: string = "";
  private possible: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  public async generate(): Promise<string> {

    for (let i = 0; i < 5; i++) {
      this.code += this.possible.charAt(Math.floor(Math.random() * this.possible.length))
    }

    return this.code;
  }
}

export { GenerateCodeShortUrlProvider };