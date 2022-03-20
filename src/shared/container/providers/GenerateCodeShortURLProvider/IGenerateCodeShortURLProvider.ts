interface IGenerateCodeShortURLProvider {
  generate(): Promise<string>;
}

export { IGenerateCodeShortURLProvider };