import { UrlsRepositoryInMemory } from "@modules/shortlink/repositories/in-memory/UrlsRepositoryInMemory";
import { GenerateCodeShortUrlProvider } from "@shared/container/providers/GenerateCodeShortUrlProvider/implementations/GenerateCodeShortUrlProvider";
import { EncodeUrlUseCase } from "../encodeUrl/EncodeUrlUseCase";
import { DecodeUrlUseCase } from "./DecodeUrlUseCase";

let urlsRepositoryInMemory: UrlsRepositoryInMemory;
let generateCodeShortUrlProvider: GenerateCodeShortUrlProvider;
let encodeUrlUseCase: EncodeUrlUseCase;
let decodeUrlUseCase: DecodeUrlUseCase;


describe("Decode Url", () => {

  beforeEach(() => {
    generateCodeShortUrlProvider = new GenerateCodeShortUrlProvider();
    urlsRepositoryInMemory = new UrlsRepositoryInMemory();
    encodeUrlUseCase = new EncodeUrlUseCase(
      urlsRepositoryInMemory,
      generateCodeShortUrlProvider
    );
    decodeUrlUseCase = new DecodeUrlUseCase(urlsRepositoryInMemory)
  })

  it("should be defined", () => {
    expect(DecodeUrlUseCase).toBeDefined();
  });

  it("should be a class", () => {
    expect(typeof DecodeUrlUseCase).toBe("function");
  });

  it("should be able have a method called execute", () => {
    expect(DecodeUrlUseCase.prototype.execute).toBeDefined();
  })

  it("should be able to decode a shortened url from an existing url in the database", async () => {

    const urlEncoded = await encodeUrlUseCase.execute("http://www.google.com")

    const UrlDecoded = await decodeUrlUseCase.execute(urlEncoded);

    expect(UrlDecoded).toBeDefined();
    expect(typeof UrlDecoded).toBe("string");
    expect(UrlDecoded).toBe("http://www.google.com");
  })

  it("should not be able to decode a short url from a url that doesn't exist in the database", async () => {


  })
})