import { IGenerateCodeShortURLProvider } from "../IGenerateCodeShortURLProvider";

class GenerateCodeShortURLProvider implements IGenerateCodeShortURLProvider {

  public async generate(): Promise<string> {

    let code: string = "";

    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < 5; i++) {
      code += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    console.log("chegou ate aqui")

    return code;
  }
}

export { GenerateCodeShortURLProvider };