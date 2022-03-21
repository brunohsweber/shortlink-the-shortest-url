interface IGenerateCodeShortUrlProvider {
  generate(): Promise<string>;
}

export { IGenerateCodeShortUrlProvider };