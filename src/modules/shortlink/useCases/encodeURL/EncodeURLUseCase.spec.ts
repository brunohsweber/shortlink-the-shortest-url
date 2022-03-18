import { UrlsRepositoryInMemory } from "@modules/shortlink/repositories/in-memory/UrlsRepositoryInMemory";
import { GenerateCode } from "@modules/shortlink/utils/GenerateCode";
import { UrlValidation } from "@modules/shortlink/utils/UrlValidation";
import { AppError } from "@shared/errors/AppError";
import { EncodeURLUseCase } from "./EncodeURLUseCase";

let urlsRepositoryInMemory: UrlsRepositoryInMemory;
let urlValidation: UrlValidation;
let generateCode: GenerateCode;
let encodeURLUseCase: EncodeURLUseCase;

describe("Encode URL", () => {
  beforeEach(() => {
    urlValidation = new UrlValidation();
    generateCode = new GenerateCode();
    urlsRepositoryInMemory = new UrlsRepositoryInMemory(generateCode);
    encodeURLUseCase = new EncodeURLUseCase(
      urlValidation,
      generateCode,
      urlsRepositoryInMemory
    );
  })

  it("should be able encode an URL", async () => {

    const encodedURL = await encodeURLUseCase.execute("http://www.google.com")

    const regexEncodeURL = /^http:\/\/localhost:3000\/[a-zA-Z0-9]{5}$/;

    expect(encodedURL).toBeDefined();
    expect(typeof encodedURL).toBe("string");
    expect(encodedURL).toMatch(regexEncodeURL);
  });

  it("should be able to return short URL with 5 character encoding after last slash", async () => {

    const result = await encodeURLUseCase.execute("http://www.google.com")

    const urlArray = result.split("/")

    const encode = urlArray[urlArray.length - 1]

    expect(typeof encode).toBe("string");
    expect(encode.length).toBe(5);
  });

  /*
  it("should not be able to re-encode a url that has already been encoded", async () => {
    expect(async () => {

      const url = "http://www.google.com"

      await encodeURLUseCase.execute(url)
      await encodeURLUseCase.execute(url)

    }).rejects.toBeInstanceOf(URLAlreadyEncodedError);
  })
  */

  it("should be able to return the short url of a url that has already been encoded", async () => {

    const url = "http://www.google.com"

    const shortURL1 = await encodeURLUseCase.execute(url)
    const shortURL2 = await encodeURLUseCase.execute(url)

    expect(shortURL2).toEqual(shortURL1)
  })

  it("should not be able to shorten an invalid URL", async () => {

    const invalidURL1 = "google"
    const invalidURL2 = "google.com"
    const invalidURL3 = ".google.com"
    const invalidURL4 = "ww.google.com"
    const invalidURL5 = "www.google"
    const invalidURL6 = "www.google."
    const invalidURL7 = "www.google.c"
    const invalidURL8 = "http:/www.google.com"
    const invalidURL9 = "htp://www.google.com"
    const invalidURL10 = "ttp://www.google.com"
    const invalidURL11 = "https://google.com"
    const invalidURL12 = "htps://google.com"

    expect(encodeURLUseCase.execute(invalidURL1)).rejects.toBeInstanceOf(AppError);
    expect(encodeURLUseCase.execute(invalidURL2)).rejects.toBeInstanceOf(AppError);
    expect(encodeURLUseCase.execute(invalidURL3)).rejects.toBeInstanceOf(AppError);
    expect(encodeURLUseCase.execute(invalidURL4)).rejects.toBeInstanceOf(AppError);
    expect(encodeURLUseCase.execute(invalidURL5)).rejects.toBeInstanceOf(AppError);
    expect(encodeURLUseCase.execute(invalidURL6)).rejects.toBeInstanceOf(AppError);
    expect(encodeURLUseCase.execute(invalidURL7)).rejects.toBeInstanceOf(AppError);
    expect(encodeURLUseCase.execute(invalidURL8)).rejects.toBeInstanceOf(AppError);
    expect(encodeURLUseCase.execute(invalidURL9)).rejects.toBeInstanceOf(AppError);
    expect(encodeURLUseCase.execute(invalidURL10)).rejects.toBeInstanceOf(AppError);
    expect(encodeURLUseCase.execute(invalidURL11)).rejects.toBeInstanceOf(AppError);
    expect(encodeURLUseCase.execute(invalidURL12)).rejects.toBeInstanceOf(AppError);
  })

})