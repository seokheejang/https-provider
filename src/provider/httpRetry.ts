const RETRIES = 3;

export const sleep = async (ms: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};

export const retryRequest = async (func: any, funcFail: any): Promise<any> => {
  let result: any;
  // console.log("func", await func, await funcFail);
  for (let i = 0; i < RETRIES; i++) {
    try {
      console.log("try1 ", i);
      if (i === 0) {
        result = await funcFail;
        console.log(1, result);
      } else if (i === 2) {
        result = await func;
        console.log(2, result);
        break;
      } else {
        result = await funcFail;
        console.log(3, result);
      }
    } catch (err) {
      console.log("dd?", err);
      if (i + 1 < RETRIES) {
        console.log("catch ", i);
        await sleep(1000);
        continue;
      }
      console.log(`Retry Request ${RETRIES}, but all Failed`);
      throw err;
    }
  }
  return result;
};
