interface IURLValidationProvider {
  isValidToEncode(url: string): Promise<Boolean>;
  isValidToDecode(url: string): Promise<Boolean>;
}

export { IURLValidationProvider };