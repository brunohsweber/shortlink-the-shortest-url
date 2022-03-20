import { container } from "tsyringe";
import { IGenerateCodeShortUrlProvider } from "./GenerateCodeShortUrlProvider/IGenerateCodeShortUrlProvider";
import { GenerateCodeShortUrlProvider } from "./GenerateCodeShortUrlProvider/implementations/GenerateCodeShortUrlProvider";

import { UrlValidationProvider } from "./UrlValidationProvider/implementations/UrlValidationProvider";
import { IUrlValidationProvider } from "./UrlValidationProvider/IUrlValidationProvider";

container.registerSingleton<IUrlValidationProvider>(
  "UrlValidationProvider",
  UrlValidationProvider
);

container.resolve<IGenerateCodeShortUrlProvider>(
  GenerateCodeShortUrlProvider
)

