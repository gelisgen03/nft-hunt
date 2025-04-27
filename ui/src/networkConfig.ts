import { getFullnodeUrl } from "@mysten/sui/client";
import { createNetworkConfig } from "@mysten/dapp-kit";

const { networkConfig, useNetworkVariable, useNetworkVariables } =
    createNetworkConfig({
        // devnet: {
        // url: getFullnodeUrl("devnet"),
        // },
        testnet: {
            url: getFullnodeUrl("testnet"),
            variables: {
                packageId: '0x0ced54440f9a5ae9d74a121a0132ebca89b999efd29daec6b6dc1aa3c5073f2a',
            },
        },
        // mainnet: {
        // url: getFullnodeUrl("mainnet"),
        // },
    });

export { useNetworkVariable, useNetworkVariables, networkConfig };
