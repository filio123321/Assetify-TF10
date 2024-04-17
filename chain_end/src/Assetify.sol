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
        bool isIncomeGenerating;
        mapping(address => uint256) dividendsOwed;
    }

    Asset[] public assets;

    // Mapping from asset ID to owner address to number of shares owned
    mapping(uint256 => mapping(address => uint256)) public assetShares;
    // mapping(address => uint256) public balances;
    mapping(uint256 => uint256) public balances;
    mapping(uint256 => uint256) public totalIncome;

    event AssetCreated(
        uint256 indexed assetId,
        string name,
        uint256 totalShares,
        uint256 pricePerShare,
        string[] ipfsHashes,
        bool isIncomeGenerating
    );

    event SharesPurchased(
        uint256 indexed assetId,
        address buyer,
        uint256 amount,
        uint256 newPricePerShare
    );
    event SharesSold(
        uint256 indexed assetId,
        address seller,
        uint256 amount,
        uint256 newPricePerShare
    );
    event ImageAdded(uint256 indexed assetId, string ipfsHash);
    event DividendsDistributed(
        uint256 indexed assetId,
        uint256 totalDividends,
    );
    event DividendsWithdrawn(
        address indexed shareholder,
        uint256 amount
    );



    function createAsset(
        string memory name,
        uint256 totalShares,
        uint256 pricePerShare,
        string[] memory ipfsHashes,
        bool isIncomeGenerating
    ) public {
        require(totalShares > 0, "Total shares must be greater than zero");
        require(pricePerShare > 0, "Price per share must be greater than zero");

        uint256 assetId = assets.length;
        assets.push(
            Asset({
                name: name,
                totalShares: totalShares,
                sharesAvailable: totalShares,
                pricePerShare: pricePerShare,
                owner: msg.sender,
                ipfsHashes: ipfsHashes,
                isIncomeGenerating: isIncomeGenerating
            })
        );
        assetShares[assetId][msg.sender] = totalShares;
        emit AssetCreated(
            assetId,
            name,
            totalShares,
            pricePerShare,
            ipfsHashes,
            isIncomeGenerating
        );
    }

    function buyShares(uint256 assetId, uint256 sharesToBuy) public payable {
        require(assetId < assets.length, "Asset does not exist");
        Asset storage asset = assets[assetId];
        require(
            msg.sender != asset.owner,
            "Asset owner cannot buy their own shares"
        );
        require(
            sharesToBuy <= asset.sharesAvailable,
            "Not enough shares available"
        );

        uint256 totalCost = 0;
        for (uint256 i = 0; i < sharesToBuy; i++) {
            totalCost += asset.pricePerShare;
            asset.pricePerShare += asset.pricePerShare / asset.totalShares; // Incremental price adjustment
        }

        require(msg.value >= totalCost, "Not enough ETH sent");
        asset.sharesAvailable -= sharesToBuy;
        assetShares[assetId][msg.sender] += sharesToBuy;
        balances[assetId] += totalCost;

        if (msg.value > totalCost) {
            payable(msg.sender).transfer(msg.value - totalCost); // Refund any excess ETH sent
        }

        emit SharesPurchased(
            assetId,
            msg.sender,
            sharesToBuy,
            asset.pricePerShare
        );
    }

    function sellShares(uint256 assetId, uint256 sharesToSell) public payable {
        require(assetId < assets.length, "Asset does not exist");
        Asset storage asset = assets[assetId];
        require(
            assetShares[assetId][msg.sender] >= sharesToSell,
            "Not enough shares owned"
        );

        uint256 totalProceeds = 0;
        for (uint256 i = 0; i < sharesToSell; i++) {
            totalProceeds += asset.pricePerShare;
            if (
                asset.pricePerShare > (asset.pricePerShare / asset.totalShares)
            ) {
                asset.pricePerShare -= asset.pricePerShare / asset.totalShares; // Decremental price adjustment
            } else {
                asset.pricePerShare = 0; // Avoid negative pricing in extreme cases
            }
        }

        // require(
        //     balances[assetId] >= totalProceeds,
        //     "Insufficient funds in contract to pay out"
        // );

        if (balances[assetId] >= totalProceeds) { ///////// THIS IS NEW
            asset.sharesAvailable += sharesToSell;
            assetShares[assetId][msg.sender] -= sharesToSell;
            payable(msg.sender).transfer(totalProceeds);
            balances[assetId] -= totalProceeds;
        } else {
            // send all funds
            asset.sharesAvailable += sharesToSell;
            assetShares[assetId][msg.sender] -= sharesToSell;
            payable(msg.sender).transfer(balances[assetId]);
            balances[assetId] = 0;
        }


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
    function getUserShares(
        uint256 assetId,
        address user
    ) public view returns (uint256) {
        require(assetId < assets.length, "Asset does not exist");
        return assetShares[assetId][user];
    }

    // New function to get the entire portfolio of a user (all assets and share counts)
    function getUserPortfolio(
        address user
    ) public view returns (uint256[] memory, uint256[] memory) {
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
        require(
            msg.sender == assets[assetId].owner,
            "Only asset owner can add images"
        );

        assets[assetId].ipfsHashes.push(ipfsHash);
        emit ImageAdded(assetId, ipfsHash);
    }

    // function to get IPFS hashes for an asset
    function getAssetImages(
        uint256 assetId
    ) public view returns (string[] memory) {
        require(assetId < assets.length, "Asset does not exist");
        return assets[assetId].ipfsHashes;
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }



    function acceptPayment(uint256 assetId) public payable {
        require(assetId < assets.length, "Asset does not exist");
        require(assets[assetId].isIncomeGenerating, "Asset does not generate income");

        totalIncome[assetId] += msg.value;
        distributeDividends(assetId);
    }

    function distributeDividends(uint256 assetId) private {
        Asset storage asset = assets[assetId];
        uint256 totalDividends = totalIncome[assetId];

        for (uint i = 0; i < assets.length; i++) {
            uint256 shareholderDividend = (totalDividends * assetShares[assetId][assets[i].owner]) / asset.totalShares;
            asset.dividendsOwed[assets[i].owner] += shareholderDividend;
        }

        totalIncome[assetId] = 0; // Reset income after distribution
        emit DividendsDistributed(assetId, totalDividends);
    }

    function withdrawDividends(uint256 assetId) public {
        uint256 owedDividends = assets[assetId].dividendsOwed[msg.sender];
        require(owedDividends > 0, "No dividends owed");

        assets[assetId].dividendsOwed[msg.sender] = 0;
        payable(msg.sender).transfer(owedDividends);
        emit DividendWithdrawn(msg.sender, owedDividends);
    }


    // TO ADD ON NEXT DEPLOYMENT

    // function deleteAsetAdmin(uint256 assetId) public onlyOwner {
    //     require(assetId < assets.length, "Asset does not exist");
    //     require(msg.sender == owner, "Only owner can delete asset");

    //     delete assets[assetId];
    // }

    // function getAsset(uint256 assetId) public view returns (Asset memory) {
    //     require(assetId < assets.length, "Asset does not exist");
    //     return assets[assetId];
    // }
}
