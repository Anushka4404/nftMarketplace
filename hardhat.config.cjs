// require("@nomicfoundation/hardhat-toolbox-viem");

// // Access environment variables using process.env
// const { SEPOLIA_RPC_URL, SEPOLIA_PRIVATE_KEY } = process.env;

// module.exports = {
//   plugins: ["@nomicfoundation/hardhat-toolbox-viem"],
//   solidity: {
//     profiles: {
//       default: {
//         version: "0.8.28",
//       },
//       production: {
//         version: "0.8.28",
//         settings: {
//           optimizer: {
//             enabled: true,
//             runs: 200,
//           },
//         },
//       },
//     },
//   },
//   networks: {
//     hardhatMainnet: {
//       type: "edr-simulated",
//       chainType: "l1",
//     },
//     hardhatOp: {
//       type: "edr-simulated",
//       chainType: "op",
//     },
//     sepolia: {
//       type: "http",
//       chainType: "l1",
//       url: SEPOLIA_RPC_URL,
//       accounts: SEPOLIA_PRIVATE_KEY ? [SEPOLIA_PRIVATE_KEY] : [],
//     },
//   },
// };


require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
    },
  },
};

// module.exports = {
//   solidity: "0.8.28",
//   networks: {
//     hardhat: {},
//     polygon_amoy: {
//       url: "https://polygon-amoy.g.alchemy.com/v2/0aSLQ63bw7FjFfUFHN3La",
//       accounts:[
//         `0x${"59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"}`,
//       ],
//       //chainId: 31337
//     },
//   },
// };
