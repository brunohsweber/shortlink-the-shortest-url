import { IGenerateCodeShortURLProvider } from "../IGenerateCodeShortURLProvider";

class GenerateCodeShortURLProvider implements IGenerateCodeShortURLProvider {

  private code: string;

  constructor() {
    this.code = "";
  }

  public async generate(): Promise<string> {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < 5; i++) {
      this.code += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return this.code;
  }
}

export { GenerateCodeShortURLProvider };