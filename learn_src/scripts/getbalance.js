// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const BN = require('bn.js');

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Bank = await hre.ethers.getContractFactory("Bank");
  const bank = await Bank.deploy();

  const [deployer] = await ethers.getSigners();
  await bank.deployed();
  console.log("Bank deployed to:", bank.address);
  try {
    const before = new BN((await bank.getBalance(deployer.address)).toString());
    console.log("User balance in bank before sending:", before.toString());
    console.log(`Trying to call depositCorrectly({ value: "1000000000000000000"}`);
    await (bank.connect(deployer).depositCorrectly({ value: "1000000000000000000"}));
    const after = new BN((await bank.getBalance(deployer.address)).toString());
    console.log("User balance in bank after sending:", after.toString());
    if(after.gt(before)) {
      console.log('Test passed');
      process.exit(0);
    } else {
      console.log('Test failed');
      process.exit(1);
    }
  }
  catch(e) {
    console.error(e);
    process.exit(1);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
