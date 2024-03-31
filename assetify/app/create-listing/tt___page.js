'use client'
import { useContext, useState, useEffect } from "react";

import { AppContext } from "@/context/context";

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from "@/components/ui/textarea"



export default function CreateListing() {
    const {
        account, connectWallet, error, balance, createAsset, fetchAllAssets, buyShares, sellShares
    } = useContext(AppContext);

    // For Assetify
    const [assetName, setAssetName] = useState('');
    const [totalShares, setTotalShares] = useState(0);
    const [pricePerShare, setPricePerShare] = useState('');
    const [assets, setAssets] = useState([]);
    const [_buyShares, _setBuyShares] = useState({}); // Object to store buy shares for each asset
    const [_sellShares, _setSellShares] = useState({});


    useEffect(() => {
        const loadAssets = async () => {
            const fetchedAssets = await fetchAllAssets();
            setAssets(fetchedAssets || []);
        };

        if (account) { // Ensure assets are fetched only if an account is connected
            loadAssets();
        }
    }, [account]); // Re-fetch assets whenever the account changes


    const handleSubmit = async () => {
        const formData = new FormData();
        const images = document.getElementById('images').files;
        for (let i = 0; i < images.length; i++) {
            formData.append('file', images[i]);
        }

        try {
            console.log('---\nTrying to upload images: ');
            console.log('formData: ', formData);
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
            
            console.log('---');

            // Call your API route for image upload
            const uploadResponse = await fetch('/api/upload-images', {
                method: 'POST',
                body: formData, // FormData will be correctly sent as 'multipart/form-data'
            });
            const { ipfsHashes } = await uploadResponse.json();
            console.log('Successfully uploaded images. IPFS hashes: ', ipfsHashes);

            // Proceed to create the asset with the returned IPFS hashes
            await createAsset(assetName, totalShares, pricePerShare, ipfsHashes);
        } catch (error) {
            console.error('Failed to upload images or create asset:', error);
        }
    };


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

            {/* error */}
            {error && <div>{error}</div>}

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
                <div>
                    <Label htmlFor="images" value="Images" />
                    <input type="file" id="images" multiple />
                </div>
                {/* <Button onClick={() => createAsset(assetName, totalShares, pricePerShare)}>Create Asset</Button> */}
                <Button onClick={handleSubmit}>Create Asset</Button>
            </div>
        </main >
    );
}
