class GenerateCode {

  private code: string;

  constructor() {
    this.code = "";
  }

  public async execute(): Promise<string> {

    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < 5; i++) {
      this.code += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return this.code;
  }
}

export { GenerateCode };