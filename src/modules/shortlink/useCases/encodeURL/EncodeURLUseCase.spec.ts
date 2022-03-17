import { UrlsRepositoryInMemory } from "@modules/shortlink/repositories/in-memory/UrlsRepositoryInMemory";
import { GenerateCode } from "@modules/shortlink/utils/GenerateCode";
import { AppError } from "@shared/errors/AppError";
import { EncodeURLUseCase } from "./EncodeURLUseCase";

let urlsRepositoryInMemory: UrlsRepositoryInMemory;
let encodeURLUseCase: EncodeURLUseCase;

describe("Encode URL", () => {
  beforeEach(() => {
    urlsRepositoryInMemory = new UrlsRepositoryInMemory();
    encodeURLUseCase = new EncodeURLUseCase();
  })

  it("should be able encode an URL", async () => {
    const url = "https://www.google.com";

    const result = await encodeURLUseCase.execute(url);

    expect(typeof result).toBe("string")
  });

  it("should not be able to shorten an invalid url", async () => {
    expect(async () => {
      const result = await encodeURLUseCase.execute("batatinhafrita123")

      return result
    }).rejects.toBeInstanceOf(AppError);
  })

})