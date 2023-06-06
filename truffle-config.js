module.exports = {
  networks: {
    development: {
      host: "127.0.0.1:7545",
      port: "7545",
      network_id: "*", // connect to any network
    },
  },

  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/truffle-abis",

  compilers: {
    solc: {
      version: "0.8.20", // Fetch exact version from solc-bin (default: truffle's version)
      optimizer: {
        enable: true,
        runs: 200,
      },
    },
  },
};
