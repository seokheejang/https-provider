import {
  SERVICE_PROVIDER_URL,
  SERVICE_PROVIDER_URL_FAIL,
  ATN_JWT,
} from "./config";
import { HttpsProviderClient } from "./provider/HttpsProviderClient";
import { FetchPoviderClient } from "./provider/FetchProviderClient";
import {
  retryRPCBasicRequest,
  retryRPCRecursiveRequest,
} from "./provider/httpRetry";
import { AxiosRpcProviderClient } from "./provider/AxiosRpcProviderClient";
import { JWTProviderClient } from "./provider/JWTProviderClient";

const url = SERVICE_PROVIDER_URL as string;
const wrongUrl = SERVICE_PROVIDER_URL_FAIL as string;
const provider = new HttpsProviderClient(url);
const providerFail = new HttpsProviderClient(wrongUrl);
const fetchProvider = new FetchPoviderClient(url, 10);
const AxiosProvider = new AxiosRpcProviderClient(url, 10);
const JWTProvider = new JWTProviderClient(url, 3000, ATN_JWT as string);

provider.loadClient();
providerFail.loadClient();
fetchProvider.loadClient();
JWTProvider.loadClient();

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

const checkNonce = async () => {
  const nonce1 = await provider.getNonce(
    "0xf3053af428cfd3711f7eed929ebb18d11dec1888",
    "pending"
  );
  const nonce2 = await provider.getNonce(
    "0xf3053af428cfd3711f7eed929ebb18d11dec1888",
    "latest"
  );
  const nonce3 = await provider.getNonce(
    "0xf3053af428cfd3711f7eed929ebb18d11dec1888"
  );

  console.log(`nonce: ${nonce1} ${nonce2} ${nonce3}`);
};

const E_JWTProvider = async () => {
  const blockNumber = await JWTProvider.getLatestBlockNumber();
  console.log(`E: blockNumber: ${blockNumber}`);
};

const main = async () => {
  // await A_retryRPCBasicRequest();
  // await B_retryRPCRecursiveRequest();
  // await C_fetchProvider();
  // await D_AxiosProvider();
  // await checkNonce();
  await E_JWTProvider();
};

main();
