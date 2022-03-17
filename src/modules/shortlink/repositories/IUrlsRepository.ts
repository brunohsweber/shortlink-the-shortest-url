interface IUrlsRepository {
  encode(url: string): Promise<String>;
  decode(url: string): Promise<String | undefined>;
}

export { IUrlsRepository };