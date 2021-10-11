//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

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





}
