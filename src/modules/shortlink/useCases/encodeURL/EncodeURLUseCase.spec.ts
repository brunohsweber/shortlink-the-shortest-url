import { UrlsRepositoryInMemory } from "@modules/shortlink/repositories/in-memory/UrlsRepositoryInMemory";
import { GenerateCode } from "@modules/shortlink/utils/GenerateCode";
import { EncodeURLUseCase } from "./EncodeURLUseCase";

let urlsRepositoryInMemory: UrlsRepositoryInMemory;
let encodeURLUseCase: EncodeURLUseCase;
let generateCode: GenerateCode;

describe("Encode URL", () => {
  beforeEach(() => {
    urlsRepositoryInMemory = new UrlsRepositoryInMemory();
    encodeURLUseCase = new EncodeURLUseCase();
    generateCode = new GenerateCode();
  })

  it("should be able encode an URL", async () => {
    const url = "https://www.google.com";

    const result = await encodeURLUseCase.execute(url);
    expect(result).toBe(url);
  });

})