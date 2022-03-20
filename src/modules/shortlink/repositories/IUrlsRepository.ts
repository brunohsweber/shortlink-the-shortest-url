import { ICreateUrlDTO } from "../dtos/ICreateUrlDTO";
import { Url } from "../infra/prisma/entities/Url";

interface IUrlsRepository {
  create({ url, codeShortUrl }: ICreateUrlDTO): Promise<Url>;
  findByUrl(url: string): Promise<Url | undefined>;
  findByShortUrl(codeShortUrl: string): Promise<Url | undefined>;
}

export { IUrlsRepository };