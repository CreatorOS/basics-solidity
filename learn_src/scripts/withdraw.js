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

  const [deployer, uesr2] = await ethers.getSigners();
  await bank.deployed();
  console.log("Bank deployed to:", bank.address);
  try {
    console.log("User balance in wallet before sending:", (await deployer.getBalance()).toString());
    const before = parseInt((await deployer.getBalance()).toString());
    console.log(`Trying to call depositCorrectly({value: 1000000000000000000})`);
    await (bank.connect(deployer).depositCorrectly({ value: "1000000000000000000"}));
    const after = parseInt((await deployer.getBalance()).toString());
    console.log("Function called successfully")
    console.log("User balance in wallet after sending:", (await deployer.getBalance()).toString())
    console.log("User balance difference:", before - after);
    console.log("Expected     difference:", (new BN("1000000000000000000", 10)).toString());
    console.log("getBalance() : ", (await bank.getBalance(deployer.address)).toString());
    console.log("Adding balance to the bank...");
    bank.connect(uesr2).addMoneyToBank({ value: "10000000000000000000"});
    const balBefore = new BN((await deployer.getBalance()).toString());
    console.log("User balance in wallet before withdraw:", balBefore.toString())
    await bank.connect(deployer).withdraw();
    console.log("Withdraw successful");
    const balAfter = new BN((await deployer.getBalance()).toString());
    console.log("User balance in wallet after withdraw:", balAfter.toString());
    if(balAfter.gt(balBefore)) {
      console.log('Test Passed');
      process.exit(0);
    } else {
      console.log('Test Failed');
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
