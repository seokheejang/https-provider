import { JsonRpcProvider, FetchRequest } from "ethers";
import axios from "axios";

export class AxiosRpcProviderClient {
  private provider!: JsonRpcProvider;
  private url: string;
  private timeout: number;

  constructor(url: string, timeout: number) {
    this.url = url;
    this.timeout = timeout;
  }

  async sendRPCRequest(method: string, params: any[] = []): Promise<any> {
    try {
      const response = await axios.post(
        this.url,
        {
          jsonrpc: "2.0",
          id: 1, // 이 값을 적절히 관리하세요.
          method,
          params,
        },
        { timeout: 1 }
      );

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = response.data;
      if (responseData.error) {
        throw new Error(`JSON-RPC error: ${responseData.error.message}`);
      }

      return responseData.result;
    } catch (error) {
      throw new Error(`Failed to send JSON-RPC request: ${error}`);
    }
  }

  loadClient() {
    this.provider = new JsonRpcProvider(this.url);
    this.provider._getConnection().timeout = 10;
    console.log("this.provider", this.provider._getConnection().timeout);
  }

  async getLatestBlockNumber(): Promise<any> {
    // const blockNumer = await this.provider.getBlockNumber();
    const blockNumber = await this.sendRPCRequest("eth_blockNumber");
    return blockNumber;
  }
}
