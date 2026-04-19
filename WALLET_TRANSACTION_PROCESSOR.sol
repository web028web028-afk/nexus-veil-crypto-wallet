// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./WALLET_CORE_SOLIDITY.sol";

contract TransactionProcessor {
    NexusVeilWalletCore private coreContract;
    address public manager;

    struct TransactionDetail {
        address sender;
        address receiver;
        uint256 amount;
        string chain;
        uint256 txTime;
        bool completed;
    }

    TransactionDetail[] public transactionHistory;

    constructor(address coreAddress) {
        coreContract = NexusVeilWalletCore(coreAddress);
        manager = msg.sender;
    }

    event TransactionExecuted(address indexed from, address indexed to, uint256 value, string chain);

    function executeTransfer(
        address receiver,
        uint256 amount,
        string calldata chain
    ) external {
        require(coreContract.checkSignerStatus(msg.sender), "Signer not authorized");
        require(receiver != address(0), "Invalid receiver");

        transactionHistory.push(TransactionDetail({
            sender: msg.sender,
            receiver: receiver,
            amount: amount,
            chain: chain,
            txTime: block.timestamp,
            completed: true
        }));

        emit TransactionExecuted(msg.sender, receiver, amount, chain);
    }

    function getTransactionCount() external view returns (uint256) {
        return transactionHistory.length;
    }

    function getLatestTransaction() external view returns (TransactionDetail memory) {
        require(transactionHistory.length > 0, "No transactions");
        return transactionHistory[transactionHistory.length - 1];
    }
}
