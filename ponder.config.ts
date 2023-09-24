import type { Config } from "@ponder/core";

export const config: Config = {
  networks: [
    { name: "base", chainId: 8453, rpcUrl: process.env.PONDER_RPC_URL_1 },
  ],
  filters: [
    {
      name: "BetchaRound/v1/Wagered",
      network: "base",
      filter: {
        event: {
          name: "Wagered",
          type: "event",
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "gambler",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "tokenAddress",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
        },
      },
      abi: "./abis/BetchaRound.json",
      startBlock: 4340000,
    },
    {
      name: "BetchaRound/v1/MessagePosted",
      network: "base",
      filter: {
        event: {
          name: "MessagePosted",
          type: "event",
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "author",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "content",
              type: "string",
            },
          ],
        },
      },
      abi: "./abis/BetchaRound.json",
      startBlock: 4340000,
    },
  ],
};
