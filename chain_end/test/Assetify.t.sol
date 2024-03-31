// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import {Test} from "forge-std/Test.sol";
import {Assetify} from "../src/Assetify.sol";

contract AssetifyTest is Test {
    Assetify public assetify;
    address public owner;
    address public buyer;

    function setUp() public {
        // Setup test environment
        owner = address(this); // Contract deployer
        buyer = address(0x1); // Simulate another user
        assetify = new Assetify();
    }

    function testCreateAsset() public {
        // Simulate creating an asset
        string memory name = "Test Asset";
        uint256 totalShares = 1000;
        uint256 pricePerShare = 1 ether;
        assetify.createAsset(name, totalShares, pricePerShare, new string[](0));

        // Verify the asset is created correctly
        (string memory assetName, uint256 shares, uint256 sharesAvailable, uint256 price, ) = assetify.assets(0);
        assertEq(assetName, name);
        assertEq(shares, totalShares);
        assertEq(sharesAvailable, totalShares);
        assertEq(price, pricePerShare);
    }

    function testBuyShares() public {
        // Setup
        testCreateAsset(); // First create an asset
        uint256 assetId = 0; // Assuming the first asset has ID 0
        uint256 sharesToBuy = 10;
        uint256 valueToSend = sharesToBuy * 1 ether; // Price per share is 1 ether

        // Execute buy shares as a different user
        vm.startPrank(buyer);
        assetify.buyShares{value: valueToSend}(assetId, sharesToBuy);
        vm.stopPrank();

        // Verify shares bought
        uint256 buyerShares = assetify.assetShares(assetId, buyer);
        assertEq(buyerShares, sharesToBuy);

        // Verify funds received by contract (Assetify)
        assertEq(address(assetify).balance, valueToSend);
    }

    function testSellShares() public {
        // Setup and buy shares
        testBuyShares(); // Ensure buyer owns some shares first
        uint256 assetId = 0; // The asset ID
        uint256 sharesToSell = 5; // Sell half of the shares bought

        // Execute sell shares as the buyer
        vm.startPrank(buyer);
        assetify.sellShares(assetId, sharesToSell);
        vm.stopPrank();

        // Verify shares sold and adjust ownership
        uint256 remainingShares = assetify.assetShares(assetId, buyer);
        assertEq(remainingShares, 5); // Started with 10 shares, sold 5
    }

    // Additional tests can be written for checking price adjustments,
    // user portfolios, and other functionalities as needed.


}
