const RETRIES = 3;

export const sleep = async (ms: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};

export const retryRPCRecursiveRequest = async (
  func: any,
  funcFail: any,
  retriesLeft: number
): Promise<any> => {
  let result;
  try {
    /**
     * Test code
     */
    // console.log(`Start retriesLeft[${retriesLeft}]`);
    // if (retriesLeft === 3) {
    //   result = await funcFail;
    // } else if (retriesLeft === 2) {
    //   result = await funcFail;
    // } else if (retriesLeft === 1) {
    //   result = await func;
    // } else {
    //   result = await funcFail;
    // }
    result = await func;
    return result;
  } catch (err) {
    if (retriesLeft === 0) {
      return Promise.reject(err);
    }
    console.log(`${retriesLeft} retries left`);
    await sleep(1000);
    return retryRPCRecursiveRequest(func, funcFail, retriesLeft - 1);
  }
};

export const retryRPCBasicRequest = async (
  func: any,
  funcFail: any
): Promise<any> => {
  let result: any;
  for (let i = 0; i < RETRIES; i++) {
    try {
      /**
       * Test code
       */
      // console.log("try1 ", i);
      // if (i === 0) {
      //   result = await funcFail;
      //   console.log(1, result);
      // } else if (i === 2) {
      //   result = await func;
      //   console.log(2, result);
      // } else {
      //   result = await funcFail;
      //   console.log(3, result);
      // }
      result = await func;
    } catch (err) {
      if (i + 1 < RETRIES) {
        await sleep(1000);
        continue;
      }
      console.log(`Retry Request ${RETRIES}, but all Failed`);
      throw err;
    }
  }
  return result;
};
