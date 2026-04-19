interface TxValidationResult {
    valid: boolean;
    message: string;
    code: number;
}

class TransactionValidator {
    private minAmount = 0.0001;
    private maxAmount = 10000;
    private allowedChains = ['ETH', 'BSC', 'POLYGON'];

    validateTransactionAmount(amount: number): TxValidationResult {
        if (isNaN(amount) || amount <= 0) {
            return { valid: false, message: 'Invalid amount value', code: 101 };
        }
        if (amount < this.minAmount) {
            return { valid: false, message: 'Amount below minimum limit', code: 102 };
        }
        if (amount > this.maxAmount) {
            return { valid: false, message: 'Amount exceeds maximum limit', code: 103 };
        }
        return { valid: true, message: 'Amount valid', code: 0 };
    }

    validateTransactionChain(chain: string): TxValidationResult {
        if (this.allowedChains.includes(chain)) {
            return { valid: true, message: 'Chain supported', code: 0 };
        }
        return { valid: false, message: 'Chain not supported', code: 104 };
    }

    validateReceiverAddress(address: string): boolean {
        return /^0x[a-fA-F0-9]{40}$/.test(address);
    }
}

export default TransactionValidator;
