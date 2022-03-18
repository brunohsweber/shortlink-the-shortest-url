class UrlValidation {
  public async validate(url: string): Promise<Boolean> {

    /* Regex de validação de URL:

      /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/

      - Ele verifica um ou nenhum dos seguintes: ftp://, http:// ou https://
      - Requer "www" na URL
      - Ele verifica qualquer número de caracteres válidos.
      - Por fim, verifica se possui um domínio e se esse domínio tem pelo menos 2 caracteres.

    */

    const regexValidateUrl = /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/

    return regexValidateUrl.test(url);
  }
}

export { UrlValidation };