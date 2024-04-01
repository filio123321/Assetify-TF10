'use client'
import { useContext, useState, useEffect, useTransition } from "react";

import { AppContext } from "@/context/context";

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from "@/components/ui/textarea"

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/react";

import { MediaRenderer } from "@thirdweb-dev/react";


export default function Marketplace() {
    const {
        account, connectWallet, error, balance, createAsset, fetchAllAssets, buyShares, sellShares
    } = useContext(AppContext);

    // For Assetify

    const [assets, setAssets] = useState([]);
    const [isPending, startTransition] = useTransition();
    // const [_buyShares, _setBuyShares] = useState({}); // Object to store buy shares for each asset
    // const [_sellShares, _setSellShares] = useState({});


    useEffect(() => {
        if (account) { // Ensure assets are fetched only if an account is connected
            startTransition(() => {
                const loadAssets = async () => {
                    const fetchedAssets = await fetchAllAssets();
                    setAssets(fetchedAssets || []);
                };
                loadAssets();
            });
        }
    }, [account, startTransition]);


    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {isPending && <div>Loading assets...</div>}

            {/* Display assets */}
            {assets.map((asset, index) => (
                <Card key={index} className="py-4"> {/* Ensure each Card has a unique key */}
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className="text-tiny uppercase font-bold">{asset.pricePerShare} ETH</p>
                        <small className="text-default-500">{asset.owner}</small>
                        <h4 className="font-bold text-large">{asset.name}</h4>
                        <h1>{JSON.stringify(asset.ipfsHashes)}</h1>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                        {/* {asset.ipfsHashes && asset.ipfsHashes[0] && (
                            // <Image
                            //     alt="Asset image"
                            //     className="object-cover rounded-xl"
                            //     // src={`https://923c0163885cbdec43fe9f8f82870f09.ipfscdn.io/ipfs/${asset.ipfsHashes[0].split('ipfs://')[1].split('/')[0]}`}
                            //     src={`https://923c0163885cbdec43fe9f8f82870f09.ipfscdn.io/ipfs/${asset.ipfsHashes[0].split('ipfs://')[1]}`}
                            //     width={270}
                            // />

                            // <MediaRenderer
                            //     // src="ipfs://Qmb9ZV5yznE4C4YvyJe8DVFv1LSVkebdekY6HjLVaKmHZi"
                            //     src={asset.ipfsHashes[0]}
                            //     // poster="ipfs://QmV4HC9fNrPJQeYpbW55NLLuSBMyzE11zS1L4HmL6Lbk7X"
                            //     poster={asset.ipfsHashes[0]}
                            // />

                            // <Image
                            //     alt="Asset image"
                            //     className="object-cover rounded-xl"
                            //     // src={`https://923c0163885cbdec43fe9f8f82870f09.ipfscdn.io/ipfs/${asset.ipfsHashes[0].split('ipfs://')[1].split('/')[0]}`}
                            //     src='https://923c0163885cbdec43fe9f8f82870f09.ipfscdn.io/ipfs/QmR2Q7kvEsdDcYPzSpo2MrrvwGvs84aTYQhkwRFhdSQACC'
                            //     // width={270}
                            // />
                        )} */}
                        <Image
                            alt="Asset image"
                            className="object-cover rounded-xl"
                            // src={`https://923c0163885cbdec43fe9f8f82870f09.ipfscdn.io/ipfs/${asset.ipfsHashes[0].split('ipfs://')[1].split('/')[0]}`}
                            src='https://923c0163885cbdec43fe9f8f82870f09.ipfscdn.io/ipfs/QmR2Q7kvEsdDcYPzSpo2MrrvwGvs84aTYQhkwRFhdSQACC.jpg'
                        />
                    </CardBody>
                </Card>
                // <h1>{JSON.stringify(asset.ipfsHashes)}</h1>
            ))}

        </main >
    );
}
