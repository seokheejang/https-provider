import { SERVICE_PROVIDER_URL, SERVICE_PROVIDER_URL_FAIL } from "./config";
import { HttpsProviderClient } from "./provider/HttpsProviderClient";
import { retryRequest } from "./provider/httpRetry";

const main = async () => {
  const url = SERVICE_PROVIDER_URL as string;
  const wrongUrl = SERVICE_PROVIDER_URL_FAIL as string;
  const provider = new HttpsProviderClient(url);
  const providerFail = new HttpsProviderClient(wrongUrl);

  provider.loadClient();
  providerFail.loadClient();

  const blockNumber = await retryRequest(
    provider.getLatestBlockNumber(),
    providerFail.getLatestBlockNumber()
  );

  console.log(`main: blockNumber: ${blockNumber}`);
};

main();
