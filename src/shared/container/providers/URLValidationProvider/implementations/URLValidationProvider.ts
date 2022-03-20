import { IURLValidationProvider } from "../IURLValidationProvider";

class URLValidationProvider implements IURLValidationProvider {

  async isValidToEncode(url: string): Promise<Boolean> {

    /* Regex de validação de URL:
      /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/

      - Ele verifica um ou nenhum dos seguintes: ftp://, http:// ou https://
      - Requer "www" na URL
      - Ele verifica qualquer número de caracteres válidos.
      - Por fim, verifica se possui um domínio e se esse domínio tem pelo menos 2 caracteres.
    */

    const regexValidateURL = /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/

    return regexValidateURL.test(url);
  }

  async isValidToDecode(url: string): Promise<Boolean> {

    const regexValidateURL = /^((http):\/\/)?www\.(localhost:3000)\.({5}$)/

    return regexValidateURL.test(url);
  }
}

export { URLValidationProvider };