import { UrlsRepositoryInMemory } from "@modules/shortlink/repositories/in-memory/UrlsRepositoryInMemory";
import { GenerateCodeShortUrlProvider } from "@shared/container/providers/GenerateCodeShortUrlProvider/implementations/GenerateCodeShortUrlProvider";
import { EncodeUrlUseCase } from "./EncodeUrlUseCase";

let urlsRepositoryInMemory: UrlsRepositoryInMemory;
let generateCodeShortUrlProvider: GenerateCodeShortUrlProvider;
let encodeUrlUseCase: EncodeUrlUseCase;

describe("Encode Url", () => {
  beforeEach(() => {
    generateCodeShortUrlProvider = new GenerateCodeShortUrlProvider();
    urlsRepositoryInMemory = new UrlsRepositoryInMemory();
    encodeUrlUseCase = new EncodeUrlUseCase(
      urlsRepositoryInMemory,
      generateCodeShortUrlProvider
    );
  })

  it("should be defined", () => {
    expect(EncodeUrlUseCase).toBeDefined();
  });

  it("should be a class", () => {
    expect(typeof EncodeUrlUseCase).toBe("function");
  });

  it("should be able have a method called execute", () => {
    expect(EncodeUrlUseCase.prototype.execute).toBeDefined();
  })

  it("should be able encode an url", async () => {
    const urlEncoded = await encodeUrlUseCase.execute("http://www.google.com")

    const codeShortUrl = urlEncoded.split("/").pop();

    expect(urlEncoded).toBeDefined();
    expect(typeof urlEncoded).toBe("string");
    expect(codeShortUrl.length).toEqual(5);
  });

  it("should be able to return the short url of a url that has already been saved", async () => {

    const Url = "http://www.google.com"

    const result1 = await encodeUrlUseCase.execute(Url)
    const result2 = await encodeUrlUseCase.execute(Url)

    expect(result2).toEqual(result1)
  })

})