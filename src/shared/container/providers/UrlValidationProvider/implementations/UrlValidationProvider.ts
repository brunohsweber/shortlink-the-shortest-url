import { IUrlValidationProvider } from "../IUrlValidationProvider";

class UrlValidationProvider implements IUrlValidationProvider {

  async isValidToEncode(Url: string): Promise<Boolean> {

    /* Regex de validação de Url:
      /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/

      - Ele verifica um ou nenhum dos seguintes: ftp://, http:// ou https://
      - Requer "www" na Url
      - Ele verifica qualquer número de caracteres válidos.
      - Por fim, verifica se possui um domínio e se esse domínio tem pelo menos 2 caracteres.
    */

    const regexValidateUrl = /^((ftp|http|https):\/\/)?www\.([\w]+)\.([\w]{2,})/

    return regexValidateUrl.test(Url);
  }

  async isValidToDecode(Url: string): Promise<Boolean> {

    const regexValidateUrl = /^http:\/\/localhost:3000(\/[\/\w]{5,5})?$/

    return regexValidateUrl.test(Url);
  }
}

export { UrlValidationProvider };