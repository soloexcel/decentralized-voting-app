# PROJECT TITLE. 
PROWESS VOTING DAPP.

# PROJECT DESCRIPTION
PROWESS is an election conducting application where candidates can be added (solely by the owner of the contract -Admin) and voters can register and cast their votes. 

# PROJECT SNAPSHOT


## AUTHOR
Olalekan Solomon Awoyemi

### PROJECT LINK

### CONTRACT EXPLANATION
The smart contract presented is an implementation of an election process where voters can cast their votes for a set of candidates. The contract allows for the addition of contestants by the admin, registration of voters, and casting of votes. The smart contract provides a transparent and decentralized system for conducting elections without the need for intermediaries.

Analysis:

The contract is written in Solidity, a programming language used for smart contract development on the Ethereum blockchain. It contains several components, including state variables, structs, functions, and modifiers. We will examine each of these components in detail.

State Variables:

The smart contract has several state variables:

`admin`: A variable that stores the address of the contract administrator. This is set to the address of the person who deploys the contract.

`voters`: A mapping that stores the details of each voter. The key is the voter's address, and the value is a struct of the Voter type, which contains information about whether the voter is registered, has voted, and the index of the candidate they voted for.

`candidates`: An array of the Candidate type that stores the details of each candidate. The struct contains the name of the candidate and the number of votes they have received.

`votingStart`: A variable that stores the timestamp of when voting begins.

`votingEnd`: A variable that stores the timestamp of when voting ends.

`minimumVotes`: A variable that stores the minimum number of votes required for the election to be valid.

`isVotingOpen`: A boolean variable that indicates whether voting is currently open or closed.

`contestantsAdded`: A boolean variable that indicates whether contestants have been added.

`totalVotes`: A variable that stores the total number of votes cast.

`registeredVoters`: An array that stores the addresses of registered voters.

`timestamp`: A variable that stores the current timestamp.

#### Structs:

### The smart contract has two structs:

`Voter`: A struct that stores information about a voter. It contains a boolean value indicating whether the voter is registered, another boolean value indicating whether the voter has voted, and a uint256 value indicating the index of the candidate the voter voted for.

`Candidate`: A struct that stores information about a candidate. It contains a string value indicating the candidate's name and a uint256 value indicating the number of votes the candidate has received.


### Functions:

The smart contract has functions that perform different actions. These functions include:

The `contestants` function allows the administrator to add candidate names, voting start and end times, and the minimum number of votes required for a valid election. It checks if contestants have already been added, if there are at least one candidate, and if the voting end time is greater than the voting start time.

The `registerVoter` function allows voters to register and checks if voting is still open and the voter has not already registered.

The `castVote` function allows voters to cast their vote for a candidate and checks if voting is still open, the voter has registered, has not voted before, and the candidate index is valid.

The `endVoting` function allows the administrator to end the voting period and check if the voting end time has elapsed and the minimum number of votes have been cast.

The `getCandidate` function allows anyone to get the name and vote count of a candidate by providing their index. It checks if the candidate index is valid.

The `getVoterHasVoted` function allows anyone to check if a specific voter has already cast their vote by providing the voter's address.

The function allows anyone to check which candidate a specific voter has voted for by providing the voter's address.

The `getRegisteredVoters` function allows anyone to get a list of registered voters.

The `getTotalVotes` function allows anyone to get the total number of votes cast in the election.

The `getWinner` function allows anyone to get the name of the candidate with the highest number of votes. It checks if the voting period has ended and returns the name of the candidate with the highest vote count.



The smart contract provides a simple and efficient way to hold elections in a transparent and secure manner. It allows for the registration of voters, adding contestants, casting votes, and announcing the winner. The use of struct and array data types makes it easy to manage the candidate and voter data, while the use of modifiers ensures that only the contract administrator can perform certain operations. Overall, the code is well-organized and easy to read, making it easier for developers to implement and modify as needed.





## HOW TO INSTALL AND RUN THE PROJECT
### CLONE THE REPOSITORY

```shell
git clone https://github.com/soloexcel/decentralized-voting-app.git
```

##### change the working directory
```shell
cd decentralized-voting-app
```

##### Dependencies Installation
```shell
npm install
```

##### Kick off the Development Server
```shell
npm run dev
```
==HINT== After starting the local development server,  click on the port link or just copy to the Chrome Browser.

```shell
http://localhost:3000
```

##### CONTRACT SETUP
- ==npm install dtoenv== to install dotenv.
- Copy the private key of the desired account from Metamask and store in a ==.env== file for ==NEXT_PUBLIC_PRIVATE_KEY== .
- Get a RPC endpoint from any node provider of your choice and store in the --.env== file for ==NEXT_PUBLIC_QUICKNODE_RPC== .

##### Local Node.
```shell
npx hardhat node
```
##### Deploy To The Node.
```shell
npx hardhat run script/deploy.js --network localhost
```

##### Other Requirement
- Make sure Metamask is installed on your browser.
- Connect an account that has goerli testnet with fake ETH.

### PROJECT DEPENDENCIES:
== Solidity== ==Hardhat== ==Ethers== ==web3modal==

### INCASE OF RUNTIME ERRORS 
==Errors== : 
- "Nonce too high. Expected nonce to be 0 but got 1. Note that transactions can't be queued when automining."

- Received invalid block tag 4. Latest block number is 0s

- eth_call: function revert error with unknown reasons.

- e.t.c.

 DO the following:

 1. Open your Ethereum wallet (such as MetaMask) and go to the account settings.
 2. Look for an option to reset the account or reset the transaction history.
 3. Follow the instructions to reset the account or transaction history.
 4. Restart the local node, and the development server.
 5. Try interracting with the application all over.





### LICENSE
This project is licensed by GRANDIDA. 

