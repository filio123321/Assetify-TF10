// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import {Script} from "forge-std/Script.sol";
import "../src/Assetify.sol"; // Update the path according to your project structure

contract AssetifyScript is Script {
    function setUp() public {
        // Setup code here, if needed
    }

    function run() public {
        vm.startBroadcast(); // Start a new broadcast transaction

        // Deploy the Assetify contract
        Assetify assetify = new Assetify();
        // console.log("Assetify deployed at:", address(assetify));

        // Create a new asset within the Assetify contract
        string memory name = "Real Estate Investment";
        uint256 totalShares = 1000;
        uint256 pricePerShare = 1 ether;
        assetify.createAsset(name, totalShares, pricePerShare);
        // console.log("Asset created:", name, totalShares, "shares at", pricePerShare, "wei per share");

        // Buy shares of the newly created asset
        // Note: This script does not handle sending ETH for the purchase, as vm.deal can be used in testing to allocate ETH
        // In a real transaction, sending ETH would be handled through {value: amount} in the transaction
        uint256 assetId = 0; // Assuming this is the first asset created and its ID is 0
        uint256 sharesToBuy = 10;
        uint256 buyValue = sharesToBuy * pricePerShare; // Calculate ETH needed for buying shares
        
        // Assuming the script runner (deployer) has enough ETH
        // In testing, use vm.deal to allocate ETH to this contract before buying
        vm.deal(address(this), buyValue); // Allocate ETH to the script contract for the purchase
        assetify.buyShares{value: buyValue}(assetId, sharesToBuy);
        // console.log("Bought", sharesToBuy, "shares of asset ID", assetId);

        // Query and log the current price after buying shares
        // uint256 currentPrice = assetify.getCurrentPrice(assetId);
        // console.log("Current price per share after purchase:", currentPrice);

        vm.stopBroadcast(); // Stop the broadcast transaction
    }
}
