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
  console.log(`Trying to call depositIncorrectly(${deployer.address}, 1000000000000000000)`);
  try {
    console.log("User balance in wallet before sending:", (await deployer.getBalance()).toString());
    const before = parseInt((await deployer.getBalance()).toString());
    await bank.depositIncorrectly(deployer.address, (new BN("1000000000000000000", 10)).toString());
    const after = parseInt((await deployer.getBalance()).toString());
    console.log("Function called successfully")
    console.log("User balance in wallet after sending:", (await deployer.getBalance()).toString())
    console.log("User balance difference:", before - after);
    console.log("Expected     difference:", (new BN("1000000000000000000", 10)).toString());
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
