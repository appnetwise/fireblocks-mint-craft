import { ethers } from 'hardhat';
import { inspect } from 'util';
import getFireBlocksSdk from './fireblocks';
import { exit } from 'process';

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const FIREBLOCKS_PRIVATEKEY_PATH = process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH;

async function main() {
  const fireblocks = getFireBlocksSdk(FIREBLOCKS_PRIVATEKEY_PATH);

  const vaultAccounts = await fireblocks.getVaultAccountsWithPageInfo({});

  // Extract vault account ids
  const vaultAccountsIds = vaultAccounts.accounts.map((va: any) => va.id);

  console.log(inspect(vaultAccountsIds, false, null, true));

  // Fetch all owned tokens in tenant with their corresponding balance
  const ownedNFTs: any = await fireblocks.getOwnedNFTs({
    vaultAccountIds: vaultAccountsIds,
    blockchainDescriptor: 'ETH_TEST3',
  });

  console.log(inspect(ownedNFTs, false, null, true));

  let contractAddr = CONTRACT_ADDRESS;

  if (ownedNFTs.data.length > 0) {
    contractAddr = ownedNFTs.data[0].collection.id;
  }

  if (!contractAddr || !contractAddr.trim()) {
    console.error(`First run the deploy script`);
    exit(-1);
  }

  const digitalContract = await ethers.getContractAt(
    'DigitalCollectible',
    CONTRACT_ADDRESS,
  );

  const users = await ethers.getSigners();

  console.log(
    'Users : ',
    users.map((u) => u.address),
  );

  const collectiblesOfEachUser = {};

  // const nft = await digitalContract.createCollectible('www.aple.com');
  // await nft.wait()
  // console.log(nft);

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    try {
      const collectibles = await digitalContract.getCollectiblesOf(
        user.address,
      );
      collectiblesOfEachUser[user.address] = collectibles;
    } catch (err) {
      collectiblesOfEachUser[user.address] = [];
      console.log(err.message);
    }
  }

  for (const key in collectiblesOfEachUser) {
    console.log(
      `User with address ${key} has collectibles: ${collectiblesOfEachUser[key]}`,
    );
  }

  const u1collectibles = collectiblesOfEachUser[users[0].address];

  if (u1collectibles.length > 0) {
    console.log('Transferring collectible ownership from u0 to u1');
    try {
      const transfertxn = await digitalContract.transferNFT(
        users[1].address,
        u1collectibles[0],
      );
      const finalTxn = await transfertxn.wait();
      console.log(finalTxn);
    } catch (err) {
      console.log(err.message);
    }
  }
}

main();
