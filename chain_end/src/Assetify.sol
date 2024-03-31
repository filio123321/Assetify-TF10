// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Assetify {
    struct Asset {
        string name;
        uint256 totalShares;
        uint256 sharesAvailable;
        uint256 pricePerShare;
        address owner;
        string[] ipfsHashes;
    }

    Asset[] public assets;

    // Mapping from asset ID to owner address to number of shares owned
    mapping(uint256 => mapping(address => uint256)) public assetShares;

    event AssetCreated(uint256 indexed assetId, string name, uint256 totalShares, uint256 pricePerShare, string[] ipfsHashes);
    event SharesPurchased(uint256 indexed assetId, address buyer, uint256 amount, uint256 newPricePerShare);
    event SharesSold(uint256 indexed assetId, address seller, uint256 amount, uint256 newPricePerShare);
    event ImageAdded(uint256 indexed assetId, string ipfsHash);

    function createAsset(string memory name, uint256 totalShares, uint256 pricePerShare, string[] memory ipfsHashes) public {
        require(totalShares > 0, "Total shares must be greater than zero");
        require(pricePerShare > 0, "Price per share must be greater than zero");

        assets.push(Asset({
            name: name,
            totalShares: totalShares,
            sharesAvailable: totalShares,
            pricePerShare: pricePerShare,
            owner: msg.sender,
            ipfsHashes: ipfsHashes
        }));

        uint256 assetId = assets.length - 1;
        emit AssetCreated(assetId, name, totalShares, pricePerShare, ipfsHashes);
    }

    function buyShares(uint256 assetId, uint256 sharesToBuy) public payable {
        require(assetId < assets.length, "Asset does not exist");
        Asset storage asset = assets[assetId];
        require(sharesToBuy <= asset.sharesAvailable, "Not enough shares available");
        uint256 cost = sharesToBuy * asset.pricePerShare;
        require(msg.value >= cost, "Not enough ETH sent");

        asset.sharesAvailable -= sharesToBuy;
        assetShares[assetId][msg.sender] += sharesToBuy;

        // Dynamic price adjustment based on the ratio of shares bought to total shares
        uint256 priceAdjustment = (msg.value / asset.totalShares) * (sharesToBuy / asset.totalShares);
        asset.pricePerShare += priceAdjustment;

        emit SharesPurchased(assetId, msg.sender, sharesToBuy, asset.pricePerShare);
    }

    function sellShares(uint256 assetId, uint256 sharesToSell) public {
        require(assetId < assets.length, "Asset does not exist");
        Asset storage asset = assets[assetId];
        require(assetShares[assetId][msg.sender] >= sharesToSell, "Not enough shares owned");

        uint256 proceeds = sharesToSell * asset.pricePerShare;
        asset.sharesAvailable += sharesToSell;
        assetShares[assetId][msg.sender] -= sharesToSell;

        // Dynamic price adjustment based on the ratio of shares sold to total shares
        uint256 priceAdjustment = (proceeds / asset.totalShares) * (sharesToSell / asset.totalShares);
        asset.pricePerShare -= priceAdjustment;

        payable(msg.sender).transfer(proceeds);

        emit SharesSold(assetId, msg.sender, sharesToSell, asset.pricePerShare);
    }

    function getCurrentPrice(uint256 assetId) public view returns (uint256) {
        require(assetId < assets.length, "Asset does not exist");
        return assets[assetId].pricePerShare;
    }

    function getAllAssets() public view returns (Asset[] memory) {
        return assets;
    }

    // New function to get the shares owned by a specific user for a specific asset
    function getUserShares(uint256 assetId, address user) public view returns (uint256) {
        require(assetId < assets.length, "Asset does not exist");
        return assetShares[assetId][user];
    }

    // New function to get the entire portfolio of a user (all assets and share counts)
    function getUserPortfolio(address user) public view returns (uint256[] memory, uint256[] memory) {
        uint256[] memory ids = new uint256[](assets.length);
        uint256[] memory shares = new uint256[](assets.length);

        for (uint256 i = 0; i < assets.length; i++) {
            if (assetShares[i][user] > 0) {
                ids[i] = i; // Asset ID
                shares[i] = assetShares[i][user]; // Number of shares the user owns in this asset
            }
        }

        return (ids, shares);
    }

    // Function to add more images to an asset
    function addAssetImage(uint256 assetId, string memory ipfsHash) public {
        require(assetId < assets.length, "Asset does not exist");
        require(msg.sender == assets[assetId].owner, "Only asset owner can add images");

        assets[assetId].ipfsHashes.push(ipfsHash);
        emit ImageAdded(assetId, ipfsHash);
    }

    // function to get IPFS hashes for an asset
    function getAssetImages(uint256 assetId) public view returns (string[] memory) {
        require(assetId < assets.length, "Asset does not exist");
        return assets[assetId].ipfsHashes;
    }

}
