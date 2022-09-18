require("@nomicfoundation/hardhat-chai-matchers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  paths: {
      artifacts: './src/artifacts'
  },
  networks: {
    ropsten: {
      url: "https://ropsten.infura.io/v3/567724881d414569a3acf4767245a2db",
      accounts: ['0x']
    }
  }
};
