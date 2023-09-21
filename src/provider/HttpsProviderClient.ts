import { JsonRpcProvider } from "ethers";

export class HttpsProviderClient {
  private provider!: JsonRpcProvider;
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  loadClient() {
    this.provider = new JsonRpcProvider(this.url);
  }

  async getLatestBlockNumber(): Promise<any> {
    // try {
    const blockNumer = await this.provider.getBlockNumber();
    return blockNumer;
    // } catch (err) {
    //   console.log("getLatestBlockNumber Error:", err);
    //   return false;
    // }
  }
}
