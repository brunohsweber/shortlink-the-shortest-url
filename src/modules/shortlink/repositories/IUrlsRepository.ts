interface IUrlsRepository {
  encode(url: String, encodedUrl: String): Promise<String>;
  decode(short_url: string): Promise<String | undefined>;
  findByUrl(url: string): Promise<String | undefined>;
}

export { IUrlsRepository };