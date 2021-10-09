| config | value |
| ------ | ----- |
| pragma | osaes 0.0.1 |
| published | false |
| default_file | learn_src/contracts/Bank.sol |

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

## First contract : `getGlobalBankBalance`

Let's write our first contract.
Open up a new file on Remix and let's start writing code!

The first line in your contract must be 


```
pragma solidity >=0.7.0 <0.9.0;
```

This is basically a way to tell remix which version of solidity to use. In solidity this is required because, the development of solidity language itself is so fast that a new version is released almost every week and things keep breaking. To be sure, the solidity compiler version should be mentioned on the top of the file.

The next thing is to define the contract itself.


```
contract Bank {
    
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
Test cases : learn_src/learn_tests/01.sh
```

## Compile and deploy

Unlike JS/Py, solidity code needs to be compiled before it can be deployed or run. On the left bar, look for the compile button and hit “compile subquest3.sol”.

You might see some warnings, but that’s OK for now.

Once the compilation is successful, we’ll deploy it. Tap on the “deploy & transaction” button on the left sidebar.

Before we actually deploy this contract, we should look at a few concepts that are new to solidity and Ethereum.

On the top, you’ll see that there are a few accounts for you to choose from. Remix has automatically created 20 accounts for you and preloaded it with 100eth money. These accounts are identified by addresses, as we had seen earlier. Remix allows you to change accounts by choosing one from the dropdown.

I want you to notice that the account you’ve selected has 100Eth in it. This is because it costs some money to deploy a contract. So you need to select an account that actually has some Ethers in it. However these 100Eth are toy Ethers, available to use only within the Remix interface & only for testing.

Then, hit deploy. There are various other options on this screen, that we'll ignore for now. We'll come back to them in the next few quests.

What does it mean to deploy?

Ethereum is a computer owned by everyone. Anyone can run code on that computer. We have to deploy code to be able to run on Ethereum. Anyone in the world can start calling the functions in the smart contracts that you've deployed immediately. You can even charge people for the same. Remix has an inbuilt toy version of Ethereum. Which is where we will be deploying first.

Now that you’ve deployed it, you’ll be able to start calling the functions.

On the right you’ll see a tick in the console box, meaning that it has been deployed and the balance of the selected account is now 99.99… This is because every deployment in Ethereum costs money. Every function call on Ethereum also costs money.

We will look at why it costs money in a later quest, because we need to understand how Ethereum works internally.

Now that the program has been deployed, an account has been created for this program where it can hold money. We can also start calling the functions we’ve written.

To interact with the contract you have just deployed, you can tap on the arrow next to the contract address on the left bar under deployed contracts and hit the button that corresponds to the function that we’ve written `getGlobalBankBalance`. Remix creates this UI with buttons and input boxes automatically, based on the content of the contract.

![Deployment in Remix](https://github.com/CreatorOS/basics-solidity/raw/master/building-a-bank/learn_src/learn_assets/1.jpg)


Each time you deploy a contract, it deploys a new instance. You cannot upgrade an already deployed contract by default. In a later quest we'll see how to overcome this limitation using upgradable contracts.

When you hit the button and call the function, you’ll see the return in the output on the console on the bottom right. Make sure you tap on the expansion arrow next to “Debug” to see the entire log.

You have to look for “decoded_output” in these logs.
![Decoded Output](https://github.com/CreatorOS/basics-solidity/raw/master/building-a-bank/learn_src/learn_assets/2.jpg)

## Add money to contract
What would we have to do if we have to add some balance to a user? We’ll create a function that takes parameters address of the user who’s balance we want to update and a value of by how much.


```
    uint globalBankBalance = 0;

    function getGlobalBankBalance() public returns(uint){
        return globalBankBalance;
    }
    
    mapping(address => uint) balances;
    
    function addBalance(address userAddress, uint amount) public payable {
        balances[userAddress] = amount;
        globalBankBalance = globalBankBalance + amount;
    }
```

[Prefilled code here](https://remix.ethereum.org/#version=soljson-v0.8.4+commit.c7e474f2.js&optimize=false&runs=200&gist=845518edb7aba6f96cc863856fa1253b&evmVersion=null)


That’s exactly what this function does here.

Let’s compile and deploy this.


Once it’s deployed tap on add balance, give an address, here’s a sample address for you `0x89Ce0f71D7387a580c6C07032f74f393a65d77F4` and a value say 1,000,000 to the call and hit transact.

![Transact button](https://github.com/CreatorOS/basics-solidity/raw/master/building-a-bank/learn_src/learn_assets/3.jpg)


After doing that tap the button `getGlobalBankBalance`. You’ll notice the output says 1M. But where did this balance come from? Did we just pull out a Million dollars from thin air? If money has come into this account, it must have gotten deducted from somewhere else, right?

To make sure this is a valid transaction, we need to add the following checks :

Is the user calling this function allowed to update the account identified by the address in the parameter? What if someone sends calls this function with 0 as amount and overwirting a victim of all their life savings?
Does the user who is calling this function “addBalance” even have the amount of money they are looking add to the balance of the said account?
If yes (for the above), has the money been debited from some account before it is credited to the account of this smart contract?

This is a lot of mess, right? Ethereum let’s you bypass all of these checks. Let’s see how to write this code better in the next subquest.

## Add money to contract the right way
In this code, we’ll change the function called addBalance with the keyword `payable`

```
    function addBalance() public payable {
        balances[msg.sender] = msg.value;
        globalBankBalance = globalBankBalance + msg.value;
    }
```

On other programming languages, you only send parameters to a function call.

On Solidity, you can send parameters _and_ money. To tell the compiler that this function is allowed to accept money – you add the modifier `payable`. If you have the `payable` keyword, you can start depositing money to this contract using this function.

Ethereum creates a special context variable called `msg` when a function is called.
How much money is being sent in this function call is denoted in `msg.value`.
Who sent this message is denoted by `msg.sender`.

`msg` is a special object that Ethereum attaches with every function call that’s made to a smart contract. Ethereum takes care of populating this context variable correctly. 

To populate the `msg` object correctly, Ethereum needs an authentication signature. This signature is provided by Remix internally. However, we'll have to use other tools called wallets to provide this signature when we are deploying in production.

If there is money being sent to the function call, Ethereum also guarantees that the sender actually holds those many ethers, and when they are sending ethers to this function, the money has been actually been deducted from their account. How Ethereum is able to do all this, we can safely ignore for this quest. We’ll dig into the machinery itself in a later quest.

When this function is called, we update the balance of that user, and the total amount being held by this contract or bank.

We use `mapping` to store what is the balance of which user. A mapping is the same as the dictionary or map data structure you might know from other programming languages. While defining the mapping, we defined the key and value data types.

The key over here is an `address` of the user who will be depositing money to this smart account and the value is an integer (uint) denoting how much money has been deposited into this contract by this user.

We will be storing this information so that when they decide to withdraw it, we know how much money they’re entitled to withdraw. Please note that we're storing the value as it is and not adding it to an existing balance. This is just to keep the code simple for now. So our bank allows only for single deposit and single withdraw.

Now, we can do an interesting thing. We don't need to store the total amount that's been sent to the bank's contract in a variable. We can simply use the fact that every address has an account which has balance. So when money is sent to this function, it is sent to this function in _this_ contract. So when the money is sent to this contract the balance in the account of this contract is automatically updated. Ethereum does that for us - it debits the sender and credits the receiver. 

```
      function getGlobalBankBalance() public returns(uint){
        return address(this).balance;
      }
```

Neat, right? I know.

Next, lets compile and run a payable function.



