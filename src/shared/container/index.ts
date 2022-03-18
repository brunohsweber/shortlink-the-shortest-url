import { UrlsRepository } from "@modules/shortlink/infra/prisma/repositories/UrlsRepository";
import { UrlsRepositoryInMemory } from "@modules/shortlink/repositories/in-memory/UrlsRepositoryInMemory";
import { IUrlsRepository } from "@modules/shortlink/repositories/IUrlsRepository";
import { container } from "tsyringe";

container.registerSingleton<IUrlsRepository>(
  "UrlsRepository",
  UrlsRepository
)

container.registerSingleton<IUrlsRepository>(
  "UrlsRepositoryInMemory",
  UrlsRepositoryInMemory
)