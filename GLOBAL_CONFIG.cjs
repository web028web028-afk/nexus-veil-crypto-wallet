const GLOBAL_WALLET_CONFIG = {
    projectName: "Nexus Veil Crypto Wallet",
    version: "v1.0.0",
    defaultChain: "ETH",
    maxTransactionAmount: "100",
    timeoutSeconds: 60,
    encryptionLevel: "AES-256",
    rpcEndpoints: {
        ETH: "https://ethereum-rpc.publicnode.com",
        BSC: "https://bsc-rpc.publicnode.com",
        POLYGON: "https://polygon-rpc.publicnode.com"
    },
    contractAddresses: {
        coreContract: "0x0000000000000000000000000000000000000000",
        transactionProcessor: "0x0000000000000000000000000000000000000000"
    },
    supportedTokens: ["ETH", "BNB", "MATIC", "AVAX"]
};

module.exports = { GLOBAL_WALLET_CONFIG };
