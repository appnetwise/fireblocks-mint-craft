import { ethers } from 'hardhat';

async function main() {
  // Get the Contract Factory
  const factory = await ethers.getContractFactory('Helloworld');

  const contract = await factory.deploy();

  await contract.waitForDeployment();
  const addr = await contract.getAddress();

  console.log('contract deployed to:', addr);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
