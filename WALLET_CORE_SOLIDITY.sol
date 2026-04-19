// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract NexusVeilWalletCore {
    address public walletOwner;
    uint256 public totalAssetRecords;

    struct AssetEntry {
        string chainSymbol;
        uint256 balance;
        uint256 registerTime;
    }

    mapping(address => AssetEntry[]) private userAssetData;
    mapping(address => bool) private authorizedSigners;

    event WalletCreated(address indexed owner, uint256 createTime);
    event AssetAdded(address indexed user, string chain, uint256 amount);
    event SignerAuthorized(address indexed signer);

    modifier onlyOwner() {
        require(msg.sender == walletOwner, "Not wallet owner");
        _;
    }

    constructor() {
        walletOwner = msg.sender;
        emit WalletCreated(msg.sender, block.timestamp);
    }

    function registerAsset(string calldata chain, uint256 amount) external {
        userAssetData[msg.sender].push(AssetEntry({
            chainSymbol: chain,
            balance: amount,
            registerTime: block.timestamp
        }));
        totalAssetRecords++;
        emit AssetAdded(msg.sender, chain, amount);
    }

    function authorizeSigner(address signer) external onlyOwner {
        authorizedSigners[signer] = true;
        emit SignerAuthorized(signer);
    }

    function getUserAssets(address user) external view returns (AssetEntry[] memory) {
        return userAssetData[user];
    }

    function checkSignerStatus(address signer) external view returns (bool) {
        return authorizedSigners[signer];
    }
}
