import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from "@/context/context";
import ListingBuy from '@/components/listingBuy';
import ListingSell from '@/components/listingSell';
import { Card, CardHeader, CardBody, CardFooter, Button, Tooltip, Skeleton, Image } from "@nextui-org/react";

function MarketListing(props) {
    const { asset } = props;
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageSrc, setImageSrc] = useState(`https://923c0163885cbdec43fe9f8f82870f09.ipfscdn.io/ipfs/${asset.ipfsHashes[0] && asset.ipfsHashes[0].split('ipfs://')[1]}`);
    const { account, checkUserShareOwnership } = useContext(AppContext);
    const [ownsShares, setOwnsShares] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [openBuyMenu, setOpenBuyMenu] = useState(false);
    const [openSellMenu, setOpenSellMenu] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    useEffect(() => {
        const checkOwnership = async () => {
            const sharesOwned = await checkUserShareOwnership(asset.assetId);
            setOwnsShares(sharesOwned && sharesOwned.toNumber() > 0);
            setIsOwner(asset.owner.toLowerCase() === account?.toLowerCase());
        };

        if (asset.assetId !== undefined && account) {
            checkOwnership();
        }

        const imageLoadTimeout = setTimeout(() => {
            if (!imageLoaded) {
                setImageSrc('/not_rendered.png');
            }
        }, 5000);

        return () => clearTimeout(imageLoadTimeout);
    }, [account, asset, checkUserShareOwnership, imageLoaded]);

    return (
        <>
            <Card className="py-4 h-full break-inside-avoid mb-4 justify-center" onPress={() => console.log("CLICKED")} isPressable>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">Available {asset.sharesAvailable}/{asset.totalShares}</p>
                    <small className="text-default-500">{parseFloat(asset.pricePerShare).toFixed(6)} ETH</small>
                    <h4 className="font-bold text-large">{asset.name}</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    {!imageLoaded && <Skeleton className="aspect-square w-auto rounded-lg" />}
                    <div className="p-1 flex items-center">
                        <Image
                            alt="Card background"
                            className={`object-cover rounded-xl ${!imageLoaded ? 'hidden' : ''}`}
                            src={imageSrc}
                            width={270}
                            onLoad={handleImageLoad}
                        />
                    </div>
                </CardBody>
                <CardFooter>
                    {ownsShares && (
                        <Button className="w-full mx-1 text-white" color="danger" onClick={() => setOpenSellMenu(true)}>
                            Sell
                        </Button>
                    )}
                    {parseInt(asset.sharesAvailable) > 0 && !isOwner ? (
                        <Button className="w-full mx-1 text-white" color="success" onClick={() => setOpenBuyMenu(true)}>
                            Buy
                        </Button>
                    ) : (
                        <Tooltip content={isOwner ? "You can't buy your own shares." : "There are no available shares to purchase."}>
                            <span className='w-full mx-1'>
                                <Button className="w-full mx-1 text-white" color="success" isDisabled>
                                    Buy
                                </Button>
                            </span>
                        </Tooltip>
                    )}
                </CardFooter>
            </Card>

            <ListingBuy open={openBuyMenu} setOpen={setOpenBuyMenu} asset={asset} />
            <ListingSell open={openSellMenu} setOpen={setOpenSellMenu} asset={asset} />
        </>
    );
}

export default MarketListing;
