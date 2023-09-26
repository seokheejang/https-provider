import { JsonRpcProvider, FetchRequest } from "ethers";

export class FetchPoviderClient {
  private provider!: JsonRpcProvider;
  private fetch!: FetchRequest;
  private url: string;
  private timeout: number;

  constructor(url: string, timeout: number) {
    this.url = url;
    this.timeout = timeout;
  }

  loadClient() {
    this.fetch = new FetchRequest(this.url);
    this.provider = new JsonRpcProvider(this.fetch);
    this.provider._getConnection().timeout = 10;
    console.log("this.provider", this.provider._getConnection().timeout);
  }

  async getLatestBlockNumber(): Promise<any> {
    // const blockNumer = await this.provider.getBlockNumber();
    const blockNumber = await this.provider._perform({
      method: "getBlockNumber",
    });

    // this.#send(0, getTime() + this.timeout, 0, this, new FetchResponse(0, "", { }, null, this));
    // const blockNumber = await this.fetch.send();
    return blockNumber;
  }
}
