import { SERVICE_PROVIDER_URL, SERVICE_PROVIDER_URL_FAIL } from "./config";
import { HttpsProviderClient } from "./provider/HttpsProviderClient";
import { FetchPoviderClient } from "./provider/FetchProviderClient";
import {
  retryRPCBasicRequest,
  retryRPCRecursiveRequest,
} from "./provider/httpRetry";
import { AxiosRpcProviderClient } from "./provider/AxiosRpcProviderClient";

const url = SERVICE_PROVIDER_URL as string;
const wrongUrl = SERVICE_PROVIDER_URL_FAIL as string;
const provider = new HttpsProviderClient(url);
const providerFail = new HttpsProviderClient(wrongUrl);
const fetchProvider = new FetchPoviderClient(url, 10);
const AxiosProvider = new AxiosRpcProviderClient(url, 10);

provider.loadClient();
providerFail.loadClient();
fetchProvider.loadClient();

const A_retryRPCBasicRequest = async () => {
  const blockNumber = await retryRPCBasicRequest(
    provider.getLatestBlockNumber(),
    providerFail.getLatestBlockNumber()
  );
  console.log(`A: blockNumber: ${blockNumber}`);
};

const B_retryRPCRecursiveRequest = async () => {
  const blockNumber = await retryRPCRecursiveRequest(
    provider.getLatestBlockNumber(),
    providerFail.getLatestBlockNumber(),
    3
  );
  console.log(`B: blockNumber: ${blockNumber}`);
};

const C_fetchProvider = async () => {
  const blockNumber = await fetchProvider.getLatestBlockNumber();
  console.log(`C: blockNumber: ${blockNumber}`);
};

const D_AxiosProvider = async () => {
  const blockNumber = await AxiosProvider.getLatestBlockNumber();
  console.log(`D: blockNumber: ${blockNumber}`);
};

const main = async () => {
  // await A_retryRPCBasicRequest();
  // await B_retryRPCRecursiveRequest();
  // await C_fetchProvider();
  await D_AxiosProvider();
};

main();
