import { UrlsRepositoryInMemory } from "@modules/shortlink/repositories/in-memory/UrlsRepositoryInMemory";
import { GenerateCodeShortURLProvider } from "@shared/container/providers/GenerateCodeShortURLProvider/implementations/GenerateCodeShortURLProvider";
import { InvalidURLToDecodeError } from "@shared/errors/InvalidURLToDecodeError";
import { EncodeURLUseCase } from "../encodeURL/EncodeURLUseCase";
import { DecodeURLUseCase } from "./DecodeURLUseCase";

let urlsRepositoryInMemory: UrlsRepositoryInMemory;
let generateCode: GenerateCodeShortURLProvider;
let encodeURLUseCase: EncodeURLUseCase;
let decodeURLUseCase: DecodeURLUseCase;


describe("Decode URL", () => {

  beforeEach(() => {
    generateCode = new GenerateCodeShortURLProvider();
    urlsRepositoryInMemory = new UrlsRepositoryInMemory();
    encodeURLUseCase = new EncodeURLUseCase(
      generateCode,
      urlsRepositoryInMemory
    );
    decodeURLUseCase = new DecodeURLUseCase(urlsRepositoryInMemory)
  })

  it("should be defined", () => {
    expect(DecodeURLUseCase).toBeDefined();
  });

  it("should be a class", () => {
    expect(typeof DecodeURLUseCase).toBe("function");
  });

  it("should be able have a method called execute", () => {
    expect(DecodeURLUseCase.prototype.execute).toBeDefined();
  })

  /*
  it("should be able to decode a shortened url from an existing url in the database", async () => {
    const result = await decodeURLUseCase.execute("123456");

    expect(result.length).toBe(6);
    expect(typeof result).toBe("string");
  })

  it("should not be able to decode a short url from a url that doesn't exist in the database", async () => {

    const invalidURL = "http://www.localhost:3000/false";

    const result = await decodeURLUseCase.execute(invalidURL);

    expect(result).toBeInstanceOf(InvalidURLToDecodeError)
  })

  */
})