import fs from "fs";
import path from "path";
import { config } from "dotenv";
config({
  path: `.env.${process.env.NODE_ENV || "development"}.local`,
});

const SERVICE_PROVIDER_URL = process.env.SERVICE_PROVIDER_URL;
const SERVICE_PROVIDER_URL_FAIL = process.env.SERVICE_PROVIDER_URL_FAIL;
const ATN_JWT = process.env.ATN_JWT;

export { SERVICE_PROVIDER_URL, SERVICE_PROVIDER_URL_FAIL, ATN_JWT };
