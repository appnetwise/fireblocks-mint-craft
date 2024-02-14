import { ethers } from 'hardhat';

async function main() {
  // Get the Contract Factory
  const digitalCollectibleFactory =
    await ethers.getContractFactory('DigitalCollectible');

  // Signers represent the Ethereum account (EOA) that you are using to interact with the network.
  const [deployer] = await ethers.getSigners();

  console.log('Deploying the contract with the account:', deployer.address);
  // Deploy the contract
  const contract = await digitalCollectibleFactory.deploy(deployer.address);

  console.log('Contract deployed to address:', contract);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
