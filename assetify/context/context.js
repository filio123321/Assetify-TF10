'use client'
import React, { createContext, useState, useEffect } from "react";
import { ethers } from 'ethers';
import { Counter__factory } from '@/generated/contract-types';

export const AppContext = createContext();

const { ethereum } = typeof window !== "undefined" ? window : {};
const COUNTER_ADDRESS = '0x97d0d80Dc46D56EE7342b47BAd2211C23b509e78';

const AppProvider = ({ children }) => {
    const [account, setAccount] = useState("");
    const [balance, setBalance] = useState("");
    const [count, setCount] = useState(0);
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
            setError(err.message);
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
                setError(err.message);
            }
        }
    };

    // Refresh counter
    const refreshCounter = async () => {
        const provider = new ethers.providers.StaticJsonRpcProvider();
        const counter = Counter__factory.connect(COUNTER_ADDRESS, provider);
        const n = await counter.number();
        setCount(n.toNumber());
    };

    // Increment counter
    const incrementCounter = async () => {
        if (!account) return; // Ensure user is connected
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = await provider.getSigner();
        const counter = Counter__factory.connect(COUNTER_ADDRESS, signer);
        await counter.increment();
        await refreshCounter(); // Refresh counter state after increment
    };

    // Set number
    const setNumber = async (number) => {
        if (!account) return; // Ensure user is connected
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = await provider.getSigner();
        const counter = Counter__factory.connect(COUNTER_ADDRESS, signer);
        await counter.setNumber(number);
        await refreshCounter(); // Refresh counter state after setting number
    };

    useEffect(() => {
        if (checkEthereumExists()) {
            ethereum.on("accountsChanged", getConnectedAccounts);
            getConnectedAccounts();
            refreshCounter(); // Initial counter state fetch
        }
        return () => {
            if (ethereum) {
                ethereum.removeListener("accountsChanged", getConnectedAccounts);
            }
        };
    }, []);

    return (
        <AppContext.Provider value={{
            account, connectWallet, error, balance, count, refreshCounter, incrementCounter, setNumber
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;