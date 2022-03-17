interface IUrlsRepository {
  encode(url, short_url: String): Promise<String>;
  decode(short_url: string): Promise<String | undefined>;
}

export { IUrlsRepository };