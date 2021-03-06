// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

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

  await bank.deployed();
  console.log("Bank deployed to:", bank.address);
  try {
    const bankBalance = await bank.getGlobalBankBalance();
    console.log("Global bank balance, should be 0 : ", parseInt(bankBalance));
    if(parseInt(bankBalance) != 0){
      console.log('Test Failed');
      process.exit(1);
    } else {
      console.log('Test Passed');
      process.exit(0);
    }
  } catch (error) {
      console.log('Test Failed');
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
