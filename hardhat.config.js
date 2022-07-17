require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    test: {
      url: "http://127.0.0.1:7545",
      accounts: ["b677fe3e042cd602f2918ce8826c42b0dfaad66a08f2b20d391b1f2c5353fdb4"]
    },
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/3nJWq5K3n0mX9PmKdOfn_HjZBn01QxbR",
      accounts: ["b62cbd9bbbf7ee24aa0eebd92ff97c6c2cdd0d41dc9a055d273801117b3236e0"]
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
  },
};
