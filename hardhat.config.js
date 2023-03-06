require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });
/** @type import('hardhat/config').HardhatUserConfig */
const NEXT_PUBLIC_QUICKNODE_RPC = process.env.NEXT_PUBLIC_QUICKNODE_RPC;
const NEXT_PUBLIC_PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: NEXT_PUBLIC_QUICKNODE_RPC,
      accounts: [NEXT_PUBLIC_PRIVATE_KEY],
    },
  }
};
