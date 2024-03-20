'use client'

import { createContext, useState, useContext } from 'react';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';
import { BrowserProvider } from "ethers";


const AccountContext = createContext();
export const useAccount = () => useContext(AccountContext);

export const AccountProvider = ({ children }) => {
    const [signer, setSigner] = useState('');

    async function connect() {
        try {
            const web3Modal = new Web3Modal({
                cacheProvider: false, // You might want to set this to true to remember the user's wallet choice
                providerOptions: {
                    walletconnect: {
                        package: WalletConnectProvider,
                        options: {
                            infuraId: "your-infura-id", // Replace this with your own Infura ID
                        },
                    },
                },
            });

            const connection = await web3Modal.connect();
            // const provider = new ethers.providers.Web3Provider(connection);
            const BrowserProvider = new BrowserProvider(window.ethereum);
            // const signer = provider.getSigner();
            // const address = await signer.getAddress();
            console.log('address:', address);
            // console.log('accounts:', accounts);
            setSigner(BrowserProvider);
            localStorage.setItem('isWalletConnected', 'true');
        } catch (err) {
            console.error('error:', err);
        }
    }

    const logout = () => {
        setProvider('');
        localStorage.removeItem('isWalletConnected');
        // Add any other cleanup logic here
    };
    return (
        <AccountContext.Provider value={{ signer, connect, logout }}>
            {children}
        </AccountContext.Provider>
    );
};
