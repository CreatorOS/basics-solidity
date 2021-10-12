//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import "hardhat/console.sol";

contract Bank {
    uint globalBankBalance; 
    function getGlobalBankBalance() public returns(uint){
        return globalBankBalance;
    }

  mapping(address => uint) balances;
  function depositIncorrectly(address user, uint amount) public {
      balances[user] = amount;
      globalBankBalance += amount;
  }
  function depositCorrectly() public payable {
      balances[msg.sender] = msg.value;
  }
    mapping(address => uint) depositTimestamps;

    function getBalance(address userAddress) public view returns(uint) {
        uint principal = balances[userAddress];
        uint timeElapsed = block.timestamp - depositTimestamps[userAddress]; //seconds
        return principal + uint((principal * 7 * timeElapsed) / (100 * 365 * 24 * 60 * 60)); //simple interest of 7%  per year
    }

    function withdraw() public payable {
        address payable withdrawTo = payable(msg.sender);
        uint amountToTransfer = getBalance(msg.sender);
        balances[msg.sender] = 0;
        console.log(amountToTransfer, address(this).balance);
        withdrawTo.transfer(amountToTransfer);
    }


    function addMoneyToBank() public payable {
        // do nothing. :)
    }



}
