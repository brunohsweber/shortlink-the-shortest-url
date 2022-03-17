import { IUrlsRepository } from "../IUrlsRepository";

class UrlsRepositoryInMemory implements IUrlsRepository {
  encode(url: string): Promise<String> {
    throw new Error("Method not implemented.");
  }
  decode(url: string): Promise<String> {
    throw new Error("Method not implemented.");
  }

}

export { UrlsRepositoryInMemory };