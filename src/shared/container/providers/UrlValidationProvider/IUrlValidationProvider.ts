interface IUrlValidationProvider {
  isValidToEncode(url: string): Promise<Boolean>;
  isValidToDecode(url: string): Promise<Boolean>;
}

export { IUrlValidationProvider };