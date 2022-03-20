import { container } from "tsyringe";

import { IUrlValidationProvider } from "./UrlValidationProvider/IUrlValidationProvider";
import { UrlValidationProvider } from "./UrlValidationProvider/implementations/UrlValidationProvider";
import { IGenerateCodeShortURLProvider } from "./GenerateCodeShortURLProvider/IGenerateCodeShortURLProvider";
import { GenerateCodeShortURLProvider } from "./GenerateCodeShortURLProvider/implementations/GenerateCodeShortURLProvider";

container.registerSingleton<IUrlValidationProvider>(
  "UrlValidationProvider",
  UrlValidationProvider
);

container.registerSingleton<IGenerateCodeShortURLProvider>(
  "GenerateCodeShortURLProvider",
  GenerateCodeShortURLProvider
)