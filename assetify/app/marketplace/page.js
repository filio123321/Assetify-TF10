'use client'
import { useContext, useState, useEffect } from "react";

import { AppContext } from "@/context/context";

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from "@/components/ui/textarea"

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/react";


export default function Marketplace() {
    const {
        account, connectWallet, error, balance, createAsset, fetchAllAssets, buyShares, sellShares
    } = useContext(AppContext);

    // For Assetify

    const [assets, setAssets] = useState([]);
    // const [_buyShares, _setBuyShares] = useState({}); // Object to store buy shares for each asset
    // const [_sellShares, _setSellShares] = useState({});


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

            {assets.map((asset, index) => (
                <Card className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <p className="text-tiny uppercase font-bold">Daily Mix</p>
                  <small className="text-default-500">{asset.pricePerShare} ETH</small>
                  <h4 className="font-bold text-large">{asset.name}</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src="/images/hero-card-complete.jpeg"
                    width={270}
                  />
                </CardBody>
              </Card>

                // <div key={index} className="asset">
                //     <div>Name: {asset.name}</div>
                //     <div>Total Shares: {asset.totalShares}</div>
                //     <div>Shares Available: {asset.sharesAvailable}</div>
                //     <div>Price Per Share: {asset.pricePerShare} ETH</div>
                //     <div>Owner: {asset.owner}</div>
                // </div>
            ))}

        </main >
    );
}
