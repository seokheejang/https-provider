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
    const blockNumber = await this.provider.getBlockNumber();
    return blockNumber;
    // } catch (err) {
    //   console.log("getLatestBlockNumber Error:", err);
    //   return false;
    // }
  }
}
