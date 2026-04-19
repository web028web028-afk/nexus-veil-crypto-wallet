class WalletUIInteract {
    constructor() {
        this.walletConnected = false;
        this.currentAccount = null;
        this.balanceDisplayElement = '#balance-display';
    }

    connectWalletButton() {
        const button = document.createElement('button');
        button.id = 'connect-wallet-btn';
        button.textContent = 'Connect Nexus Veil Wallet';
        button.style.padding = '12px 24px';
        button.style.borderRadius = '8px';
        button.addEventListener('click', () => this.handleWalletConnect());
        document.body.appendChild(button);
    }

    async handleWalletConnect() {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                this.currentAccount = accounts[0];
                this.walletConnected = true;
                this.updateUIStatus('Connected');
                this.renderAccountInfo();
            } catch (error) {
                this.updateUIStatus('Connection Failed');
            }
        } else {
            this.updateUIStatus('No Web3 Wallet Detected');
        }
    }

    updateUIStatus(status) {
        const statusElement = document.getElementById('wallet-status');
        if (statusElement) {
            statusElement.textContent = `Status: ${status}`;
        }
    }

    renderAccountInfo() {
        const accountDiv = document.createElement('div');
        accountDiv.id = 'account-info';
        accountDiv.innerHTML = `<p>Connected Account: ${this.currentAccount}</p>`;
        document.body.appendChild(accountDiv);
    }

    updateBalanceDisplay(balance) {
        const el = document.querySelector(this.balanceDisplayElement);
        if (el) el.textContent = `Balance: ${balance} ETH`;
    }
}

window.WalletUI = new WalletUIInteract();
