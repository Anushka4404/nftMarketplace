// //import { ethers } from "hardhat";

// import hardhat from "hardhat";
// const { ethers } = hardhat;

// async function main() {

//   const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
//   const nftMarketplace = await NFTMarketplace.deploy();

//   await nftMarketplace.waitForDeployment();   // replace deprecated deployed()

//   console.log(
//     // ` deployed contract Address ${nftMarketplace.address}`
//     "Contract deployed at:", await nftMarketplace.getAddress()
//   );
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });


import hre from "hardhat";

async function main() {
  console.log("Deploying with:", (await ethers.getSigners())[0].address);

  console.log("Hardhat loaded:", hre !== undefined);

  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const marketplace = await NFTMarketplace.deploy();

  await marketplace.waitForDeployment();

  console.log("Contract deployed at:", await marketplace.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
