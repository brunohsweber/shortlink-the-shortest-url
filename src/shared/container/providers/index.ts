import { container } from "tsyringe";
import { IGenerateCodeShortURLProvider } from "./GenerateCodeShortURLProvider/IGenerateCodeShortURLProvider";
import { GenerateCodeShortURLProvider } from "./GenerateCodeShortURLProvider/implementations/GenerateCodeShortURLProvider";

import { URLValidationProvider } from "./URLValidationProvider/implementations/URLValidationProvider";
import { IURLValidationProvider } from "./URLValidationProvider/IURLValidationProvider";

container.registerSingleton<IURLValidationProvider>(
  "URLValidationProvider",
  URLValidationProvider
);

container.registerSingleton<IGenerateCodeShortURLProvider>(
  "GenerateCodeShortURLProvider",
  GenerateCodeShortURLProvider
)

