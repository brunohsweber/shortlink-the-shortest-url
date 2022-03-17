interface IUrlsRepository {
  create(data: IEncodeUrlDTO): Promise<void>;
  findByUrl(url: string): Promise<void | undefined>;
}

export { IUrlsRepository };