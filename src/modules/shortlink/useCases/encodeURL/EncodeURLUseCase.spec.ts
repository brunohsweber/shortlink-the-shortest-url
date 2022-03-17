import { UrlsRepositoryInMemory } from "@modules/shortlink/repositories/in-memory/UrlsRepositoryInMemory";
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
    expect(result).toBe(url);
  });

})