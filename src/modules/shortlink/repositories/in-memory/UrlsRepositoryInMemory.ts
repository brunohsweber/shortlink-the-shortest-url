import { IUrlsRepository } from "../IUrlsRepository";

class UrlsRepositoryInMemory implements IUrlsRepository {
  create(data: IEncodeUrlDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findByUrl(url: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

}

export { UrlsRepositoryInMemory };