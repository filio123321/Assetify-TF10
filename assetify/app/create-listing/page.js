"use client"

import { useContext, useState, useEffect } from "react";
import { useStorageUpload } from "@thirdweb-dev/react"; // Import useStorageUpload hook

import { AppContext } from "@/context/context";

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
// import { Textarea } from "@/components/ui/textarea";
import { Input as SInput } from "@/components/ui/input"


import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import { Input } from "@nextui-org/react";


export default function CreateListing() {
    const {
        account, connectWallet, error, balance, createAsset, fetchAllAssets, buyShares, sellShares
    } = useContext(AppContext);

    // For Assetify
    const [assetName, setAssetName] = useState('');
    const [totalShares, setTotalShares] = useState(1);
    const [pricePerShare, setPricePerShare] = useState('');
    const [assets, setAssets] = useState([]);

    const [localError, setLocalError] = useState(''); // Local error state to handle form validation errors

    const { mutateAsync: upload } = useStorageUpload();

    useEffect(() => {
        const loadAssets = async () => {
            const fetchedAssets = await fetchAllAssets();
            setAssets(fetchedAssets || []);
        };

        if (account) {
            loadAssets();
        }
    }, [account]);

    const handleSubmit = async () => {
        setLocalError(''); // Reset local error state
        // check if all fields are filled
        if (!assetName || !totalShares || !pricePerShare) {
            console.error('All fields are required');
            setLocalError('All fields are required');
            return;
        } else if (totalShares < 1) {
            console.error('Total shares must be greater than 0');
            setLocalError('Total shares must be greater than 0');
            return;
        } else if (isNaN(totalShares)) {
            console.error('Total shares must be a number');
            setLocalError('Total shares must be a number');
            return;
        } else if (isNaN(pricePerShare)) {
            console.error('Price per share must be a number');
            setLocalError('Price per share must be a number');
            return;
        } else if (pricePerShare < 0) {
            console.error('Price per share must be greater than 0');
            setLocalError('Price per share must be greater than 0');
            return;
        } else if (!document.getElementById('images').files.length > 0) {
            console.error('At least one image is required');
            setLocalError('At least one image is required');
            return;
        }


        const images = document.getElementById('images').files;
        try {
            console.log('---\nTrying to upload images to IPFS');

            // Asynchronously prepare data for IPFS upload
            const dataToUpload = await Promise.all(Array.from(images).map(async (file) => {
                return file;
            }));

            // Upload the data to IPFS
            const ipfsHashes = await upload({ data: dataToUpload });

            // create an arry of IPFS URIs
            const ipfsHashesArray = Object.values(ipfsHashes);
            // Proceed to create the asset with the returned IPFS URIs
            await createAsset(assetName, totalShares, pricePerShare, ipfsHashesArray);
        } catch (error) {
            console.error('Failed to upload images to IPFS or create asset:', error);
        }
    };



    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-12">
            <div className="flex flex-col items-center justify-center space-y-4">
                <Card>
                    <CardHeader>
                        <h4 className="text-xl">Create Listing</h4>
                    </CardHeader>
                    <CardBody>
                        {localError && <div className="text-red-500">{localError}</div>}
                        {error && <div className="text-red-500">{error}</div>}

                        <div className="py-4">
                            <Label htmlFor="assetName" value="Asset Name" />
                            <Input label="Asset name" id="assetName" value={assetName} onChange={(e) => setAssetName(e.target.value)} isRequired />
                        </div>
                        <div className="py-4">
                            <Label htmlFor="totalShares" value="Total Shares" />
                            <Input id="totalShares" label="Total shares" type="number" value={totalShares} onChange={(e) => setTotalShares(parseInt(e.target.value))} isRequired />
                        </div>
                        <div className="py-4">
                            <Label htmlFor="pricePerShare" value="Price Per Share (ETH)" />
                            <Input id="pricePerShare" label="Price per share in ETH" value={pricePerShare} onChange={(e) => setPricePerShare(e.target.value)} isRequired />
                        </div>
                        <div className="py-4">
                            <Label htmlFor="images" value="Images" />
                            <Input type="file" id="images" labelPlacement="outside-left" multiple isRequired />
                        </div>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={handleSubmit}>Create Asset</Button>
                    </CardFooter>
                </Card>
            </div>
        </main>
    );
}
