import { ICreateUrlDTO } from "../dtos/ICreateUrlDTO";
import { IUrlDTO } from "../dtos/IUrlDTO";

interface IUrlsRepository {
  create({ url, codeShortUrl }: ICreateUrlDTO): Promise<string>;
  findByUrl(url: string): Promise<IUrlDTO | undefined>;
  findByShortUrl(codeShortUrl: string): Promise<IUrlDTO | undefined>;
}

export { IUrlsRepository };