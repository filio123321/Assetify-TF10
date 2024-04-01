"use client"

import { useContext, useState, useEffect } from "react";
import { useStorageUpload } from "@thirdweb-dev/react"; // Import useStorageUpload hook

import { AppContext } from "@/context/context";

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input"



export default function CreateListing() {
    const {
        account, connectWallet, error, balance, createAsset, fetchAllAssets, buyShares, sellShares
    } = useContext(AppContext);

    // For Assetify
    const [assetName, setAssetName] = useState('');
    const [totalShares, setTotalShares] = useState(0);
    const [pricePerShare, setPricePerShare] = useState('');
    const [assets, setAssets] = useState([]);

    const { mutateAsync: upload } = useStorageUpload(); // Use the upload function from useStorageUpload

    useEffect(() => {
        const loadAssets = async () => {
            const fetchedAssets = await fetchAllAssets();
            setAssets(fetchedAssets || []);
        };

        if (account) {
            loadAssets();
        }
    }, [account]);

    // const uploadToIPFS = async (image) => {
    //     const uploadUrl = await upload({
    //         data: [image],
    //         options: {
    //             uploadWithGatewayUrl: true,
    //             uploadWithoutDirectory: true,
    //         },
    //     })

    //     return uploadUrl;
    // }

    const handleSubmit = async () => {
        const images = document.getElementById('images').files;
        try {
            console.log('---\nTrying to upload images to IPFS');

            // Asynchronously prepare data for IPFS upload
            const dataToUpload = await Promise.all(Array.from(images).map(async (file) => {
                return {
                    name: file.name,
                    type: file.type,
                    buffer: await file.arrayBuffer() // Correctly await the arrayBuffer call
                };
            }));

            // Upload the data to IPFS
            const ipfsHashes = await upload({ data: dataToUpload });
            // let ipfsHashes = [];
            // for (let i = 0; i < dataToUpload.length; i++) {
            //     const uploadUrl = await uploadToIPFS(dataToUpload[i]);
            //     ipfsHashes.push(uploadUrl);
            // }
            console.log('Successfully uploaded images. IPFS hashes: ', ipfsHashes);

            // create an arry of IPFS URIs
            const ipfsHashesArray = Object.values(ipfsHashes);
            // Proceed to create the asset with the returned IPFS URIs
            await createAsset(assetName, totalShares, pricePerShare, ipfsHashesArray);
        } catch (error) {
            console.error('Failed to upload images to IPFS or create asset:', error);
        }
    };


    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="box">
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

            {/* Error */}
            {error && <div>{error}</div>}

            <div>
                {/* Asset Creation Form */}
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
                    {/* <input type="file" id="images" multiple /> */}
                    <Input type="file" id="images" multiple />
                </div>
                <Button onClick={handleSubmit}>Create Asset</Button>
            </div>
        </main>
    );
}