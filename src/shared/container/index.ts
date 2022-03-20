import { UrlsRepository } from "@modules/shortlink/infra/prisma/repositories/UrlsRepository";
import { IUrlsRepository } from "@modules/shortlink/repositories/IUrlsRepository";
import { container } from "tsyringe";

import "@shared/container/providers";

container.registerSingleton<IUrlsRepository>(
  "UrlsRepository",
  UrlsRepository
)

