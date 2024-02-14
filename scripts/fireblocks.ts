import { FireblocksSDK } from 'fireblocks-sdk';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const apiKey = process.env.FIREBLOCKS_API_KEY;

// Choose the right api url for your workspace type
const baseUrl = 'https://sandbox-api.fireblocks.io';

let fireblocks: FireblocksSDK = null;

function getFireBlocksSdk(filepath: string): FireblocksSDK {
  if (fireblocks) {
    return fireblocks;
  }
  const apiSecret = readFileSync(resolve(filepath), 'utf8');

  fireblocks = new FireblocksSDK(apiSecret, apiKey, baseUrl);

  return fireblocks;
}

export default getFireBlocksSdk;
