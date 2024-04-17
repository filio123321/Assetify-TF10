"use client"

import { useContext, useState, useEffect } from "react";
import { useStorageUpload } from "@thirdweb-dev/react"; // Import useStorageUpload hook
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

import { AppContext } from "@/context/context";

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
// import { Textarea } from "@/components/ui/textarea";
import { Input as SInput } from "@/components/ui/input"


import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import { Input } from "@nextui-org/react";

import { Loader2 } from "lucide-react"



export default function CreateListing() {
    const {
        account, connectWallet, error, balance, createAsset, fetchAllAssets, buyShares, sellShares
    } = useContext(AppContext);

    const { width, height } = useWindowSize()


    // For Assetify
    const [assetName, setAssetName] = useState('');
    const [totalShares, setTotalShares] = useState(1);
    const [pricePerShare, setPricePerShare] = useState('');
    const [assets, setAssets] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [localError, setLocalError] = useState(''); // Local error state to handle form validation errors // razl ot error
    const [submitButtonLoading, setSubmitButtonLoading] = useState(false);

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

    useEffect(() => {
        if (error) {
            console.log('Error:', error.code);
            setLocalError(handleError(error));
        }
    }, [error]);

    const handleError = (err) => {
        if (err.code === 'ACTION_REJECTED') {
            // User rejected the transaction
            return "Transaction was rejected by the user.";
        } else if (err.code === 'WALLET_NOT_CONNECTED') {
            // Insufficient funds for gas * price + value
            return "Insufficient funds in the wallet.";
        } else if (err.code === 'MISSING_PROVIDER') {
            // Handle smart contract reverts specifically
            return `Smart contract error: ${err.message}`;
        } else {
            // General error handler
            // return err.message || "An unexpected error occurred.";
            return err.message || "An unexpected error occurred.";
        }
    };


    const handleSubmit = async () => {
        setLocalError(''); // Reset local error state
        setSuccessMessage(''); // Reset success message
        setSubmitButtonLoading(true); // Set submit button loading state
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
            try {
                await createAsset(assetName, totalShares, pricePerShare, ipfsHashesArray);
                setSuccessMessage('Asset created successfully!'); // Add this line
            } catch (error) {
                console.error('Failed to create asset:', error);
                setLocalError('Failed to create asset');
            }
        } catch (error) {
            console.error('Failed to upload images to IPFS or create asset:', error);
            setLocalError('Failed to upload images to IPFS or create asset');
        }

        setSubmitButtonLoading(false); // Reset submit button loading state
    };

    const SubmitButton = () => {
        if (submitButtonLoading) {
            return (
                <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </Button>
            );
        } else {
            return (
                <Button onClick={handleSubmit}>Create Asset</Button>
            );
        }
    }

    const ShowConfetti = () => {
        if (successMessage) {
            return (
                <Confetti width={width} height={height} />
            );
        } else {
            return null;
        }
    }


    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-12">
            <ShowConfetti />
            <div className="flex flex-col items-center justify-center space-y-4">
                <Card>
                    <CardHeader>
                        <h4 className="text-xl">Create Listing</h4>
                    </CardHeader>
                    <CardBody>
                        {localError && <div className="text-red-500">{localError}</div>}
                        {successMessage && <div className="text-green-500">{successMessage}</div>}
                        {/* {error.message && <div className="text-red-500">{error.message}</div>} */}

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
                            <Label htmlFor="images" value="images" />
                            <Input type="file" id="images" labelPlacement="outside-left" multiple isRequired />
                        </div>
                    </CardBody>
                    <CardFooter>
                        {/* <Button onClick={handleSubmit}>Create Asset</Button> */}
                        {/* <Button disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button> */}
                        <SubmitButton />
                    </CardFooter>
                </Card>
            </div>
        </main>
    );
}
