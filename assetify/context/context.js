'use client'
import React, { createContext, useState, useEffect } from "react";
import { ethers } from 'ethers';
import { Assetify__factory } from '@/generated/contract-types';

export const AppContext = createContext();

const { ethereum } = typeof window !== "undefined" ? window : {};
const ASSETIFY_ADDRESS = '0x436fFC644600a461B64e985c11834C17BEE0a359';

const AppProvider = ({ children }) => {
    const [account, setAccount] = useState("");
    const [balance, setBalance] = useState("");
    const [error, setError] = useState("");


    // Check for MetaMask
    const checkEthereumExists = () => {
        if (!ethereum) {
            setError("Please Install MetaMask.");
            return false;
        }
        return true;
    };

    // Fetch account details on change
    const getConnectedAccounts = async () => {
        setError("");
        try {
            const accounts = await ethereum.request({
                method: "eth_accounts",
            });
            setAccount(accounts[0] || "");
            if (accounts[0]) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                setBalance(ethers.utils.formatEther(await signer.getBalance()));
            }
        } catch (err) {
            setError(err);
        }
    };

    // Connect to the wallet
    const connectWallet = async () => {
        setError("");
        if (checkEthereumExists()) {
            try {
                const accounts = await ethereum.request({
                    method: "eth_requestAccounts",
                });
                setAccount(accounts[0]);
            } catch (err) {
                setError(err);
            }
        }
    };


    const createAsset = async (name, totalShares, pricePerShare, ipfsHashes) => {
        if (!account) return; // Ensure user is connected
        try {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = await provider.getSigner();
            const assetify = Assetify__factory.connect(ASSETIFY_ADDRESS, signer);
            const tx = await assetify.createAsset(name, totalShares, ethers.utils.parseEther(pricePerShare.toString()), ipfsHashes);
            await tx.wait();
            console.log("Asset created successfully");
        } catch (err) {
            console.error("Error creating asset:", err);
            setError(err || "Failed to create asset");
        }
    };

    // Function to fetch all assets
    const fetchAllAssets = async () => {
        if (!ethereum) return; // Ensure Ethereum object is available
        try {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const assetify = Assetify__factory.connect(ASSETIFY_ADDRESS, provider);
            const assets = await assetify.getAllAssets();
            console.log("Fetched assets:", assets);
            // Convert BigNumber and address values to strings for easy display
            // And include the assetId by using the index in the map function
            const decodedAssets = assets.map((asset, index) => ({
                assetId: index, // Assigning the index as the assetId
                name: asset.name,
                totalShares: asset.totalShares.toString(),
                sharesAvailable: asset.sharesAvailable.toString(),
                pricePerShare: ethers.utils.formatEther(asset.pricePerShare),
                owner: asset.owner,
                ipfsHashes: asset.ipfsHashes
            }));
            return decodedAssets;
        } catch (err) {
            console.error("Error fetching assets:", err);
            setError(err || "Failed to fetch assets");
        }
    };

    const buyShares = async (assetId, sharesToBuy, value) => {
        if (!account) return; // Ensure user is connected
        try {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = await provider.getSigner();
            const assetify = Assetify__factory.connect(ASSETIFY_ADDRESS, signer);
            const tx = await assetify.buyShares(assetId, sharesToBuy, { value: ethers.utils.parseEther(value.toString()), gasLimit: 200000 });
            await tx.wait();
            console.log("Shares bought successfully");
        } catch (err) {
            console.error("Error buying shares:", err);
            setError(err || "Failed to buy shares");
        }
    };


    // Function to sell shares
    const sellShares = async (assetId, sharesToSell) => {
        if (!account) return; // Ensure user is connected
        try {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = await provider.getSigner();
            const assetify = Assetify__factory.connect(ASSETIFY_ADDRESS, signer);
            const tx = await assetify.sellShares(assetId, sharesToSell, { gasLimit: 300000 });
            await tx.wait();
            console.log("Shares sold successfully");
        } catch (err) {
            console.error("Error selling shares:", err);
            setError(err || "Failed to sell shares");
        }
    };

    const checkUserShareOwnership = async (assetId) => {
        if (!account) return; // Ensure user is connected
        try {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const assetify = Assetify__factory.connect(ASSETIFY_ADDRESS, provider);
            const sharesOwned = await assetify.getUserShares(assetId, account);
            return sharesOwned;
        } catch (err) {
            console.error("Error checking share ownership:", err);
            setError(err || "Failed to check share ownership");
        }
    };

    // Function to get contract balance
    const getContractBalance = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const assetify = Assetify__factory.connect(ASSETIFY_ADDRESS, signer);
        const balance = await assetify.getContractBalance();
        return ethers.utils.formatEther(balance);
    };



    // Initial setup
    useEffect(() => {
        if (checkEthereumExists()) {
            ethereum.on("accountsChanged", getConnectedAccounts);
            getConnectedAccounts();
        }
        return () => {
            if (ethereum) {
                ethereum.removeListener("accountsChanged", getConnectedAccounts);
            }
        };
    }, []);

    return (
        <AppContext.Provider value={{
            // account, connectWallet, error, balance, count, refreshCounter, incrementCounter, setNumber
            account, connectWallet, error, balance, createAsset, fetchAllAssets, buyShares, sellShares, checkUserShareOwnership, getContractBalance
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;