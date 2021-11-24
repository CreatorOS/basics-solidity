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
    const before = new BN((await bank.getGlobalBankBalance()).toString());
    console.log("Bank balance before sending:", before.toString());
    console.log(`Trying to call depositIncorrectly(${deployer.address}, 1000000000000000000)`);
    await bank.depositIncorrectly(deployer.address,ethers.utils.parseUnits('1', 'ether').toHexString());
    const after = new BN((await bank.getGlobalBankBalance()).toString());
    console.log("Bank balance after sending:", after.toString());
    console.log("Function called successfully")
    if(after.gt(before)) {
      console.log('Test passed');
      process.exit(0);
    } else {
      console.error('Test failed');
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
