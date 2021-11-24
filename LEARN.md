| config       | value                        |
| ------------ | ---------------------------- |
| pragma       | osaes 0.0.1                  |
| published    | false                        |
| default_file | learn_src/contracts/Bank.sol |

# Building a bank with Solidity; for beginners

Welcome to the Solidity Joyride Quest. In this quest you will learn all about the basics of developing applications on Ethereum. We don’t require you to have any background on Ethereum development. If you’re a developer in any programming language and you've heard the terms _Ethereum_, _Blockchain_, _Crypto Currencies_ etc. you should be good.

In this _Quest_ we’ll be developing a Bank using Ethereum – where anyone can deposit money and earn interest. Guess what, this won’t be a toy product that won’t work in the real world. It will be something you can start deploying in the real world directly. You will quickly see how Ethereum & Solidity are so much easier to develop applications that involve transacting real money – unlike any traditional programming language you’d have seen.

Solidity has some constructs and data structures built into it that makes building financial applications simple and secure. By the end of this quest you’ll be able to deploy a bank that can start transacting money!

Banks are some of the most sophisticated softwares to build because of how much security is needed. Using solidity, you’ll be able to write a secure bank that is as secure as the most secure bank on the planet with less than 30 lines of code.

Ethereum is the underlying blockchain infrastructure, and Solidity is a programming language to write applications.

At the end of this quest you’ll know how to build contracts that are almost as good as contracts written by projects like PoolTogether and Compound – which are multi million dollar projects right now.

There are multiple tracks you can pick from in later quests ranging from building your own DeFi projects, security auditing other contracts, and earn some money along the way!

## The Interface

We will be writing all our code in this Mobile Code Interface. You don’t have to install any software to get started.

This is a code editor that runs a toy blockchain that we’ll be using to deploy our first contract. Most of the steps are automated. In a later Quest, we’ll install all the components by hand to understand better what is happening under the hood.

## First contract : `getGlobalBankBalance`

Let's write our first contract.
Open up the file in the background and start writing code.

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
    uint globalBankBalance;
    function getGlobalBankBalance() public view returns(uint){
        return globalBankBalance;
    }
```

This is one place where Solidity shines. A class can accept and store money natively – without having to integrate payment gateways like stripe or razorpay.

Every user and every program on Ethereum has an account. An account is identified by an address. It is unique for each account and looks something like “0x123123…”. This account can hold money.

The little program we’ve written will also have an account by default. Whatever money we send to this account, the program is allowed to do whatever it wants with those funds. It can transfer it any other account, it can burn the money or it can just sit on that cash and do nothing. Using solidity, we can write the logic of how the program will use the money in the account.

We’ve not sent any money to our contract (aka program’s) account yet. But in the next few subquests, you’ll see how we can write the logic to receive money and use those funds to build a smart bank.

At this point, make sure you have setup the pragma, the contract and the function before you move on to the next quest.

Make sure you have the pragma correctly set in your file and hit the `Run Tests` button.
You should see that the first test should pass, likely the others are going to fail - but that's ok, we'll build one by one.

## Compile and deploy

Unlike JS/Py, solidity code needs to be compiled before it can be deployed or run.
After writing the code, hit compile.

You might see some warnings, but that’s OK for now.

Once the compilation is successful, we’ll deploy it. We'll do so by running the tests.

We'll now analyze some of the output we're seeing on the screen, upon running the tests.

First you'll notice `Deployer address : ` and a `Balance`.
The MCI has created an account for you. This account is identified by the address. Since you are the person deploying the contract, you are the `deployer`. Your account is identified by this `address`.

The MCI also gives you some test ETH as you'd see in your balance. You get 10ETH by default. 1 ETH = 10^18 wei.
This is ofcourse not real Eth. This is only toy Eth that we'll use on our MCI. For every running anything on ethereum you need some Eth. So, instead of needing you to buy Eth to even run a simple test, MCI gives you a few toy Eth to start playing around with :)

What does it mean to deploy?

Ethereum is a computer owned by everyone. Anyone can run code on that computer. We have to deploy code to be able to run on Ethereum. Anyone in the world can start calling the functions in the smart contracts that you've deployed immediately. You can even charge people for the same. Remix has an inbuilt toy version of Ethereum. Which is where we will be deploying first. You'll notice that the balance in the deployer's account is 9.999 Eth. That is because the account initially had 10Eth but some of that got used to deploy the contract itself.

Now that you’ve deployed it, you’ll be able to start calling the functions.

## Adding functions

Let's first write a function to deposit money incorrectly. Then we'll add the correct function.

```
  uint globalBankBalance;
  mapping(address => uint) public balances;
  function depositIncorrectly(address user, uint amount) public{
      balances[user] = amount;
      globalBankBalance += amount;
  }
```

This quest already has tests written where it'll call this function add balance with the parameters "deployer's address" and "1eth".

Hit run tests to see if your function has been correctly set up.

If your test passes for this part, you'll see
`Function called successfully`

However, the function calls depositIncorrectly with a balance of 10^18.
However the balance difference in the user's wallet before and after sending the transaction would be much smaller.
Meaning the amount that we intended to deposit didn't get deducted from the user's balance. Then, how can we update the `balances[user]`?

We cannot. We need to do something else.

To make sure this is done correctly, we need to add the following checks :

- Is the user calling this function allowed to update the account identified by the address in the parameter?
- What if someone sends calls this function with 0 as amount and overwriting a victim of all their life savings?
- Does the user who is calling this function `deposit` even have the amount of money they are looking add to the balance of the said account?
  - If yes (for the above), has the money been debited from some account before it is credited to the account of this smart contract?

This is a lot of mess, right? Ethereum let’s you bypass all of these checks. Let’s see how to write this code better in the next subquest.

## Add money to contract the right way

In this code, we’ll change the function called depositCorrectly with the keyword `payable`

```
    function depositCorrectly() public payable {
        balances[msg.sender] = msg.value;
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

## Payable value, msg.value, msg.sender v/s params, wei

The 5th test on the testcases will send money to this contract.
By making the function payable, you're allowing people (and the test runner) to send Ethers to your contract. When Ethers are sent to the contract. When money is sent to the function it is measured in a denomination called Wei. 1Eth = 10^18 Wei. Wei is the smallest denomination of money you can send on the Ethereum ecosystem.

When you call a function - you send the function parameters and the `msg` object. The msg object is populated with the address of the account from which the function is called and also the amount of money attached to this function call.

Running the tests will show you the address of the sender, the amount attached in the function call.
You can log the msg.sender and msg.value to see what was actually sent by using

```
import "hardhat/console.sol";
```

This should be included right after your pragma statement.
This is a utility function for logging.

Then, inside your `depositCorrectly` add

```
console.log(msg.sender);
console.log(msg.value);
```

Then, when you run the tests, you should see these variables in the output of test 5.

## Introducing block, interest

When withdrawing, we not only want to give the money back, we also want to add some interest.

So we need to store when the deposit was made along with how much. For that we’ll introduce a new mapping called `depositTimestamp`.

```
    mapping(address => uint) depositTimestamps;

    function depositCorrectly() public payable {
        balances[msg.sender] = msg.value;
        depositTimestamps[msg.sender] = block.timestamp;
    }
```

Now timestamps are tricky in solidity. There is no such thing as current timestamp. That is because, the functions you call on Ethereum/solidity aren’t executed immediately. They are batched into a few thousands. Once there are a few thousand functioncalls - called transactions - are registered, all of them are run together. This batch of function calls is called a block. The block in blockchain. A block is nothing but a set of all transactions that were a part of this batch. So we only get the timestamp of when the entire batch was run. i.e. block.timestamp = when were all the transactions in this block executed. That is why it takes between 10-20 seconds for a transaction to be completed on the real blockchain.

Now that we have the timestamp stored of when the transaction was made to deposit money, we’ll add a function called getBalance. Here, the user address can be a parameter because we’ll let anyone look up any other person’s balance – but only the actual owner of the balance can withdraw it.

Let us in this function not only return the principal they deposited, but also a simple interest.

```
    function getBalance(address userAddress) public view returns(uint) {
        uint principal = balances[userAddress];
        uint timeElapsed = block.timestamp - depositTimestamps[userAddress]; //seconds
        return principal + uint((principal * 7 * timeElapsed) / (100 * 365 * 24 * 60 * 60)); //simple interest of 7%  per year
    }
```

Note that the calculation looks a little complex because solidity doesn’t have support for decimals (float or double) yet.

Run the tests to see that the balance keeps increasing with time

Now that the interest has been calculated, let’s withdraw.

## Withdraw & transfer

```
    function withdraw() public payable {
        address payable withdrawTo = payable(msg.sender);
        uint amountToTransfer = getBalance(msg.sender);
        balances[msg.sender] = 0;
        withdrawTo.transfer(amountToTransfer);
    }
```

Here we will allow for a withdrawal.

We need to look up what is the balance of the user who is requesting a withdrawal. So we will use `msg.sender` now just to make sure the withdrawal is being made by the person who is actually requesting the same.

We’ve already written the logic for how much money this user has including the simple interest. So we’ll just use the same function to get how much money to send to the withdrawer.

We need to send money to an account identified by an address. This address we know from msg.sender. But we’ll need to convert it into a payable address before we can send money. This is just a check to make sure we don’t send money to undeserving addresses by mistake. Then we initiate a transfer.

Let’s deploy.

This time after deploying, let’s add money to the account.

Check the balance a few times. We see that the balance is increasing, by whatever small amount.

Now let’s withdraw.

But you wouldn’t have received any amount back into your account. Why do you think that is? The transaction failed.

Let’s check balance in contract : 10eth

Let’s check the balance of the user : 10.0000001eth because of interest.

Where is this interest coming from? Are we pulling it out of thin air? The contract can only send as much money it has in its coffers. We’re trying to send more than it has. That is why the transaction fails, when you run the test 7.

In order to have this test pass, we need to add some money.

We need to add money to the contract account itself.
We don't write any logic, just define a function where we can send in some money by making it payable.

```
    function addMoneyToBank() public payable {
        // do nothing. :)
    }
```

Before withdrawing, we'll add some money to the bank so that it has enough balance to payout the user. That is, payout the principal plus the interest.

Let's run tests again!

## What next?

You just successfully wrote code that runs on Ethereum. But how is it any different from running a python program on my desktop?

Ofcourse in this primer, we’ve abstracted out a lot of jargons so that we can get to the crux of the matter. To build resilient smart contracts, it is important to understand what is really happening and understand some of the jargons.

Ethereum is a world computer. Everyone is running code on this single computer. Anyone can connect their laptop to this world computer and add a CPU to it, and make it even more powerful. There are hundreds of thousands of computers that contribute their processing power to this world computer. Each of these computers are called miner nodes.

If you remember, it costed us some ethers to deploy a contract or call a function in our contract. That is because these miner nodes need to pay for electricity to keep their computers always on and connected to the world computer. This money we’re paying for running our code is called gas and it is paid in Ethers (or wei).

In the next quest we’ll explore more into these details and deploy what you’ve built so that you can start sharing the contract you’ve made with your friends 😊
