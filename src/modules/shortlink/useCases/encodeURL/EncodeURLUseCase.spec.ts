import { UrlsRepositoryInMemory } from "@modules/shortlink/repositories/in-memory/UrlsRepositoryInMemory";
import { GenerateCodeShortURLProvider } from "@shared/container/providers/GenerateCodeShortURLProvider/implementations/GenerateCodeShortURLProvider";
import { UrlValidationProvider } from "@shared/container/providers/UrlValidationProvider/implementations/UrlValidationProvider";

import { EncodeURLUseCase } from "./EncodeURLUseCase";
import { InvalidURLToEncodeError } from "./InvalidURLToEncodeError";

let urlsRepositoryInMemory: UrlsRepositoryInMemory;
let urlValidation: UrlValidationProvider;
let generateCodeShortURL: GenerateCodeShortURLProvider;
let encodeURLUseCase: EncodeURLUseCase;

describe("Encode URL", () => {
  beforeEach(() => {
    urlValidation = new UrlValidationProvider();
    generateCodeShortURL = new GenerateCodeShortURLProvider();
    urlsRepositoryInMemory = new UrlsRepositoryInMemory();
    encodeURLUseCase = new EncodeURLUseCase(
      urlValidation,
      generateCodeShortURL,
      urlsRepositoryInMemory
    );
  })

  it("should be defined", () => {
    expect(EncodeURLUseCase).toBeDefined();
  });

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

  it("should be able to return the short url of a url that has already been saved", async () => {
    const url = "http://www.google.com"

    const result1 = await encodeURLUseCase.execute(url)
    const result2 = await encodeURLUseCase.execute(url)

    expect(result2).toEqual(result1)
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

    expect(encodeURLUseCase.execute(invalidURL1)).rejects.toBeInstanceOf(InvalidURLToEncodeError);
    expect(encodeURLUseCase.execute(invalidURL2)).rejects.toBeInstanceOf(InvalidURLToEncodeError);
    expect(encodeURLUseCase.execute(invalidURL3)).rejects.toBeInstanceOf(InvalidURLToEncodeError);
    expect(encodeURLUseCase.execute(invalidURL4)).rejects.toBeInstanceOf(InvalidURLToEncodeError);
    expect(encodeURLUseCase.execute(invalidURL5)).rejects.toBeInstanceOf(InvalidURLToEncodeError);
    expect(encodeURLUseCase.execute(invalidURL6)).rejects.toBeInstanceOf(InvalidURLToEncodeError);
    expect(encodeURLUseCase.execute(invalidURL7)).rejects.toBeInstanceOf(InvalidURLToEncodeError);
    expect(encodeURLUseCase.execute(invalidURL8)).rejects.toBeInstanceOf(InvalidURLToEncodeError);
    expect(encodeURLUseCase.execute(invalidURL9)).rejects.toBeInstanceOf(InvalidURLToEncodeError);
    expect(encodeURLUseCase.execute(invalidURL10)).rejects.toBeInstanceOf(InvalidURLToEncodeError);
    expect(encodeURLUseCase.execute(invalidURL11)).rejects.toBeInstanceOf(InvalidURLToEncodeError);
    expect(encodeURLUseCase.execute(invalidURL12)).rejects.toBeInstanceOf(InvalidURLToEncodeError);
  })

})