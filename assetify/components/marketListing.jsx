'use client'

import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { Skeleton } from "@nextui-org/react";

function MarketListing(props) {
    const { asset } = props;
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <Card className="py-4 h-full break-inside-avoid mb-4 justify-center" isPressable>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Available {asset.sharesAvailable}/{asset.totalShares}</p>
                <small className="text-default-500">{asset.pricePerShare} ETH</small>
                <h4 className="font-bold text-large">{asset.name}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                {!imageLoaded && <Skeleton className="aspect-square w-auto rounded-lg" />}
                <Image
                    alt="Card background"
                    className={`object-cover rounded-xl ${!imageLoaded ? 'hidden' : ''}`}
                    src={`https://ipfs.io/ipfs/${asset.ipfsHashes[0] && asset.ipfsHashes[0].split('ipfs://')[1]}`}
                    width={270}
                    onLoad={handleImageLoad}
                />
            </CardBody>
        </Card>
    );
}

export default MarketListing;