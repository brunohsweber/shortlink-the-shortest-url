import { IUrlsRepository } from "@modules/shortlink/repositories/IUrlsRepository";

class UrlsRepository implements IUrlsRepository {
  encode(url: string): Promise<String> {
    throw new Error("Method not implemented.");
  }
  decode(url: string): Promise<String> {
    throw new Error("Method not implemented.");
  }
}

export { UrlsRepository };