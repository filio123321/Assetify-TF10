// 'use client'
import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { Skeleton } from "@nextui-org/react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/carousel";

function MarketListing(props) {
    const { asset } = props;
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <Card className="py-4 h-full break-inside-avoid mb-4 justify-center">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Available {asset.sharesAvailable}/{asset.totalShares}</p>
                <small className="text-default-500">{asset.pricePerShare} ETH</small>
                <h4 className="font-bold text-large">{asset.name}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                {!imageLoaded && <Skeleton className="aspect-square w-auto rounded-lg" />}
                <Carousel className="w-full max-w-xs">
                    <CarouselContent className="flex ">
                        {asset.ipfsHashes.map((ipfsImageHash, index) => (
                            <CarouselItem key={index} className="flex  ">
                                <div className="p-1 flex  items-center" >
                                    <Image
                                        alt="Card background"
                                        className={`object-cover rounded-xl ${!imageLoaded ? 'hidden' : ''}`}
                                        src={`https://ipfs.io/ipfs/${ipfsImageHash && ipfsImageHash.split('ipfs://')[1]}`}
                                        width={270}
                                        onLoad={handleImageLoad}
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </CardBody>
        </Card>
    );
}

export default MarketListing;