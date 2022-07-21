require("dotenv").config();

require("@nomicfoundation/hardhat-toolbox");

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.8.9",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:7545",
      chainId: 1337,
      accounts: ["3a1bdc9c2f2f510e5dba8ca1f33dcdd42cde5ce08635b3e7c32063c4a42d4e82"]
    },
    hardhat: {
    },
    rinkeby: {
      url: process.env.ALCHEMY_RINKEBY_URL,
      chainId: 4,
      accounts: [process.env.ACCOUNT_KEY]
    },
    mainnet: {
      url: process.env.ALCHEMY_MAINNET_URL,
      chainId: 1,
      gasPrice: 20000000000,
      accounts: [process.env.MAIN_KEY]
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  paths: {
    artifacts: './src/artifacts',
    sources: './contracts',
    tests: './test',
    cache: './cache',
  },
};
