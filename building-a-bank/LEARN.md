# BUILDING A BANK WITH SOLIDITY; FOR BEGINNERS

Welcome to the Solidity Joyride Quest. In this quest you will learn all about the basics of developing applications on Ethereum. We don’t require you to have any background on Ethereum development. If you’re a developer in any programming language and you've heard the terms _Ethereum_, _Blockchain_, _Crypto Currencies_ etc. you should be good.

In this _Quest_ we’ll be developing a Bank using Ethereum – where anyone can deposit money and earn interest. Guess what, this won’t be a toy product that won’t work in the real world. It will be something you can start deploying in the real world directly. You will quickly see how Ethereum & Solidity are so much easier to develop applications that involve transacting real money – unlike any traditional programming language you’d have seen. 

Solidity has some constructs and data structures built into it that makes building financial applications simple and secure. By the end of this quest you’ll be able to deploy a bank that can start transacting money!

Banks are some of the most sophisticated softwares to build because of how much security is needed. Using solidity, you’ll be able to write a secure bank that is as secure as the most secure bank on the planet with less than 30 lines of code.

Ethereum is the underlying blockchain infrastructure, and Solidity is a programming language to write applications.

At the end of this quest you’ll know how to build contracts that are almost as good as contracts written by projects like PoolTogether and Compound – which are multi million dollar projects right now. 

There are multiple tracks you can pick from in later quests ranging from building your own DeFi projects, security auditing other contracts, and earn some money along the way!


## Remix
We will be writing all our code in a new IDE called Remix. It sucks, but it’s the best editor for Solidity available out of the box. It is a browser based IDE, so you don’t have to install any software to get started.

[Open Remix](https://remix.org)

Remix is a code editor for Solidity. It also runs a toy blockchain that we’ll be using to deploy our first contract. Most of the steps are automated in Remix. In a later Quest, we’ll install all the components by hand to understand better what is happening under the hood.

## First contract : `getContractBalance`

Let's write our first contract.
Open up a new file on Remix and let's start writing code!

The first line in your contract must be 

```
pragma solidity >=0.7.0 <0.9.0;
```

This is basically a way to tell remix which version of solidity to use. In solidity this is required because, the development of solidity language itself is so fast that a new version is released almost every week and things keep breaking. To be sure, the solidity compiler version should be mentioned on the top of the file.

The next thing is to define the contract itself.

```
contract SmartBankAccount {
    
}
```

Programs on solidity are called contracts. A contract keyword is exactly similar to the class keyword you would have encountered on js/py/java. We will define our data and methods inside this class (aka contract).

Lastly , the function that we’ll write a function to get the balance of our bank.

```
    function getGlobalBankBalance() public returns(uint){
        return 0;
    }
```

This is one place where Solidity shines. A class can accept and store money natively – without having to integrate payment gateways like stripe or razorpay.

Every user and every program on Ethereum has an account. An account is identified by an address. It is unique for each account and looks something like “0x123123…”. This account can hold money. 

The little program we’ve written will also have an account by default. Whatever money we send to this account, the program is allowed to do whatever it wants with those funds. It can transfer it any other account, it can burn the money or it can just sit on that cash and do nothing. Using solidity, we can write the logic of how the program will use the money in the account.

We’ve not sent any money to our contract (aka program’s) account yet. But in the next few subquests, you’ll see how we can write the logic to receive money and use those funds to build a smart bank.

At this point, make sure you have setup the pragma, the contract and the function before you move on to the next quest. 

```
Todo : test cases 
```



