describe("Encode URL", () => {
  beforeEach(() => {
    urlsRepositoryInMemory = new UrlsRepositoryInMemory();
    encodeURLUseCase = new EncodeURLUseCase(urlsRepositoryInMemory);
  })

  it("should be able encode an URL", () => {
    const url = "https://www.google.com";
    const result = encodeURLUseCase(url);
    expect(result).toBe("https%3A%2F%2Fwww.google.com");
  });

})