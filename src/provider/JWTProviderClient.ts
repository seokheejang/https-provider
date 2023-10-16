import { JsonRpcProvider } from "ethers";
import axios from "axios";

export class JWTProviderClient {
  private provider!: JsonRpcProvider;
  private url: string;
  private timeout: number;
  private authToken: string;

  constructor(url: string, timeout: number, authToken: string) {
    this.url = url;
    this.timeout = timeout;
    this.authToken = authToken;
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
        {
          timeout: this.timeout,
          headers: {
            Authorization: `Bearer ${this.authToken}`,
          },
        }
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
    // this.provider._getConnection().timeout = 10;
  }

  async getLatestBlockNumber(): Promise<any> {
    // const blockNumer = await this.provider.getBlockNumber();
    const blockNumber = await this.sendRPCRequest("eth_blockNumber");
    return blockNumber;
  }
}
