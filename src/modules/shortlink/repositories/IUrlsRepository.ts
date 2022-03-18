import { ICreateUrlDTO } from "../dtos/ICreateUrlDTO";

interface IUrlsRepository {
  create({ url, shortUrl }: ICreateUrlDTO): Promise<String>;
  findByShortUrl(shortUrl: string): Promise<String | undefined>;
  findByUrl(url: string): Promise<String | undefined>;
}

export { IUrlsRepository };