import { UrlsRepository } from "@modules/shortlink/infra/prisma/repositories/UrlsRepository";
import { IUrlsRepository } from "@modules/shortlink/repositories/IUrlsRepository";
import { container } from "tsyringe";

container.registerSingleton<IUrlsRepository>(
  "UrlsRepository",
  UrlsRepository
)