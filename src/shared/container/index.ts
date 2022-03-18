import { UrlsRepository } from "@modules/shortlink/infra/prisma/repositories/UrlsRepository";
import { IUrlsRepository } from "@modules/shortlink/repositories/IUrlsRepository";
import { GenerateCode } from "@modules/shortlink/utils/GenerateCode";
import { UrlValidation } from "@modules/shortlink/utils/UrlValidation";
import { container } from "tsyringe";

container.registerSingleton<IUrlsRepository>(
  "UrlsRepository",
  UrlsRepository
)

container.registerSingleton<GenerateCode>(
  "GenerateCode",
  GenerateCode
)

container.registerSingleton<UrlValidation>(
  "UrlValidation",
  UrlValidation
)