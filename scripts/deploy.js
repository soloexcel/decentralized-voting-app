const hre = require("hardhat")
const fs = require("fs") //file system

async function main() {
	//deploy the contract
	const Election = await hre.ethers.getContractFactory("Election");

	// deploy the contract
	const election = await Election.deploy()

	// wait for the contract to finish deploying
	await election.deployed();

	// save the contract address to a local file.
	fs.writeFileSync('./context/config.js', 
  `export const contractAddress = "${election.address}"
  export const ownerAddress = "${election.signer.address}"`) 

}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });