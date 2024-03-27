'use client'
import { useContext, useState, useEffect } from "react";

import { AppContext } from "@/context/context";

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from "@/components/ui/textarea"



export default function CreateListing() {
    const {
        account, connectWallet, error, balance, createAsset, fetchAllAssets
    } = useContext(AppContext);

    // For Assetify
    const [assetName, setAssetName] = useState('');
    const [totalShares, setTotalShares] = useState(0);
    const [pricePerShare, setPricePerShare] = useState('');
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        const loadAssets = async () => {
            const fetchedAssets = await fetchAllAssets();
            setAssets(fetchedAssets || []);
        };

        if (account) { // Ensure assets are fetched only if an account is connected
            loadAssets();
        }
    }, [account]); // Re-fetch assets whenever the account changes


    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="box" >
                {
                    account ? (
                        <>
                            <div>{account}</div>
                            <div>{balance}</div>
                        </>
                    ) : (
                        <Button onClick={connectWallet}>Connect Wallet</Button>
                    )
                }
            </div>

            <div>
                <div>
                    <Label htmlFor="assetName" value="Asset Name" />
                    <Textarea id="assetName" placeholder="Enter asset name" value={assetName} onChange={(e) => setAssetName(e.target.value)} />
                </div>
                <div>
                    <Label htmlFor="totalShares" value="Total Shares" />
                    <Textarea id="totalShares" placeholder="Enter total shares" type="number" value={totalShares} onChange={(e) => setTotalShares(parseInt(e.target.value))} />
                </div>
                <div>
                    <Label htmlFor="pricePerShare" value="Price Per Share (ETH)" />
                    <Textarea id="pricePerShare" placeholder="Enter price per share" value={pricePerShare} onChange={(e) => setPricePerShare(e.target.value)} />
                </div>
                <Button onClick={() => createAsset(assetName, totalShares, pricePerShare)}>Create Asset</Button>
            </div>

            <div>
                {assets.map((asset, index) => (
                    <div key={index} className="asset">
                        <div>Name: {asset.name}</div>
                        <div>Total Shares: {asset.totalShares}</div>
                        <div>Shares Available: {asset.sharesAvailable}</div>
                        <div>Price Per Share: {asset.pricePerShare} ETH</div>
                        <div>Owner: {asset.owner}</div>
                    </div>
                ))}
            </div>
        </main >
    );
}
