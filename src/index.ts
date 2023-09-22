import { SERVICE_PROVIDER_URL, SERVICE_PROVIDER_URL_FAIL } from "./config";
import { HttpsProviderClient } from "./provider/HttpsProviderClient";
import {
  retryRPCBasicRequest,
  retryRPCRecursiveRequest,
} from "./provider/httpRetry";

const url = SERVICE_PROVIDER_URL as string;
const wrongUrl = SERVICE_PROVIDER_URL_FAIL as string;
const provider = new HttpsProviderClient(url);
const providerFail = new HttpsProviderClient(wrongUrl);

provider.loadClient();
providerFail.loadClient();

const exampleA = async () => {
  const blockNumber = await retryRPCBasicRequest(
    provider.getLatestBlockNumber(),
    providerFail.getLatestBlockNumber()
  );
  console.log(`exampleA: blockNumber: ${blockNumber}`);
};

const exampleB = async () => {
  const blockNumber = await retryRPCRecursiveRequest(
    provider.getLatestBlockNumber(),
    providerFail.getLatestBlockNumber(),
    3
  );
  console.log(`exampleB: blockNumber: ${blockNumber}`);
};

const main = async () => {
  await exampleA();
  await exampleB();
};

main();
