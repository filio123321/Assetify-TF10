// 'use client'
import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from "@/context/context";
import ListingBuy from '@/components/listingBuy';
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { Skeleton } from "@nextui-org/react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/carousel";

import { Button } from "@nextui-org/react";

function MarketListing(props) {
    const { asset } = props;
    const [imageLoaded, setImageLoaded] = useState(false);
    const { account, checkUserShareOwnership } = useContext(AppContext);
    const [ownsShares, setOwnsShares] = useState(false);
    const [openBuyMenu, setOpenBuyMenu] = React.useState(false)


    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    useEffect(() => {
        const checkOwnership = async () => {
            const sharesOwned = await checkUserShareOwnership(asset.assetId);
            if (sharesOwned && sharesOwned.toNumber() > 0) {
                setOwnsShares(true);
            } else {
                setOwnsShares(false);
            }
        };

        if (asset.assetId !== undefined) {
            checkOwnership();
        }
    }, [account, asset, checkUserShareOwnership]);

    return (
        <>
            <Card className="py-4 h-full break-inside-avoid mb-4 justify-center" onPress={() => console.log("CLIECKED")} isPressable>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">Available {asset.sharesAvailable}/{asset.totalShares}</p>
                    <small className="text-default-500">{asset.pricePerShare} ETH</small>
                    <h4 className="font-bold text-large">{asset.name}</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    {!imageLoaded && <Skeleton className="aspect-square w-auto rounded-lg" />}
                    <div className="p-1 flex items-center" >
                        <Image
                            alt="Card background"
                            className={`object-cover rounded-xl ${!imageLoaded ? 'hidden' : ''}`}
                            src={`https://ipfs.io/ipfs/${asset.ipfsHashes[0] && asset.ipfsHashes[0].split('ipfs://')[1]}`}
                            width={270}
                            onLoad={handleImageLoad}
                        />
                    </div>
                    {/* <Carousel className="w-full max-w-xs">
                        <CarouselContent className="flex ">
                            {asset.ipfsHashes.map((ipfsImageHash, index) => (
                                <CarouselItem key={index} className="flex  ">
                                    <div className="p-1 flex items-center" >
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

                    </Carousel> */}
                </CardBody>
                <CardFooter>
                    {/* <Button className="w-full mx-1" color="danger">Sell</Button>
                <Button className="w-full mx-1" color="success">Buy</Button> */}
                    {/* <Button className="w-full mx-1" color="danger" disabled={!ownsShares}>Sell</Button> */}
                    {ownsShares && <Button className="w-full mx-1" color="danger">Sell</Button>}
                    <Button className="w-full mx-1" color="success" onClick={() => setOpenBuyMenu(true)}>Buy</Button>
                </CardFooter>
            </Card>

            <ListingBuy open={openBuyMenu} setOpen={setOpenBuyMenu} asset={asset} />

        </>
    );
}

export default MarketListing;