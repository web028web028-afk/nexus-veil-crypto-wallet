const ethers = require('ethers');

class ChainConnectorUtils {
    constructor() {
        this.supportedChains = ['ETH', 'BSC', 'POLYGON', 'AVAX'];
        this.providerCache = new Map();
    }

    createProvider(chain) {
        if (this.providerCache.has(chain)) {
            return this.providerCache.get(chain);
        }

        let provider;
        switch (chain) {
            case 'ETH':
                provider = new ethers.JsonRpcProvider('https://ethereum-rpc.publicnode.com');
                break;
            case 'BSC':
                provider = new ethers.JsonRpcProvider('https://bsc-rpc.publicnode.com');
                break;
            case 'POLYGON':
                provider = new ethers.JsonRpcProvider('https://polygon-rpc.publicnode.com');
                break;
            default:
                throw new Error('Chain not supported');
        }

        this.providerCache.set(chain, provider);
        return provider;
    }

    async fetchWalletBalance(address, chain) {
        const provider = this.createProvider(chain);
        const balance = await provider.getBalance(address);
        return ethers.formatEther(balance);
    }

    validateAddress(address) {
        return ethers.isAddress(address);
    }

    getSupportedChains() {
        return [...this.supportedChains];
    }
}

module.exports = ChainConnectorUtils;
