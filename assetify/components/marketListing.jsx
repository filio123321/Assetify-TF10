import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from "@/context/context";
import ListingBuy from '@/components/listingBuy';
import ListingSell from '@/components/listingSell';
import { Card, CardHeader, CardBody, CardFooter, Button, Tooltip, Skeleton } from "@nextui-org/react";

function MarketListing(props) {
    const { asset } = props;
    const [contentLoaded, setContentLoaded] = useState(false);
    const [contentType, setContentType] = useState('image');
    const [contentSrc, setContentSrc] = useState('');
    const { account, checkUserShareOwnership } = useContext(AppContext);
    const [ownsShares, setOwnsShares] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [openBuyMenu, setOpenBuyMenu] = useState(false);
    const [openSellMenu, setOpenSellMenu] = useState(false);

    useEffect(() => {
        const checkOwnership = async () => {
            const sharesOwned = await checkUserShareOwnership(asset.assetId);
            setOwnsShares(sharesOwned && sharesOwned.toNumber() > 0);
            setIsOwner(asset.owner.toLowerCase() === account?.toLowerCase());
        };

        if (asset.assetId !== undefined && account) {
            checkOwnership();
        }

        const url = `https://923c0163885cbdec43fe9f8f82870f09.ipfscdn.io/ipfs/${asset.ipfsHashes[0] && asset.ipfsHashes[0].split('ipfs://')[1]}`;
        fetch(url, { method: 'HEAD' })
            .then(response => {
                const fileType = response.headers.get('Content-Type');
                if (fileType.startsWith('image')) {
                    setContentType('image');
                    setContentSrc(url);
                } else if (fileType.startsWith('video')) {
                    setContentType('video');
                    setContentSrc(url);
                } else if (fileType === 'application/pdf') {
                    setContentType('pdf');
                    setContentSrc(url);
                } else {
                    setContentSrc('/not_rendered.png');
                }
            })
            .catch(() => setContentSrc('/not_rendered.png'));

        const loadTimeout = setTimeout(() => {
            if (!contentLoaded) {
                setContentSrc('/not_rendered.png');
            }
        }, 5000);

        return () => clearTimeout(loadTimeout);
    }, [account, asset, checkUserShareOwnership]);

    const renderContent = () => {
        switch (contentType) {
            case 'image':
                return <img src={contentSrc} alt="Card background" className="object-cover rounded-xl" onLoad={() => setContentLoaded(true)} />;
            case 'video':
                return <video src={contentSrc} controls className="w-full h-auto rounded-xl" onLoadedData={() => setContentLoaded(true)} />;
            case 'pdf':
                return <iframe src={contentSrc} className="w-full h-auto rounded-xl" onLoad={() => setContentLoaded(true)} />;
            default:
                return <p>Unsupported file type</p>;
        }
    };

    return (
        <>
            <Card className="py-4 h-full break-inside-avoid mb-4 justify-center" onPress={() => console.log("CLICKED")} isPressable>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">Available {asset.sharesAvailable}/{asset.totalShares}</p>
                    <small className="text-default-500">{parseFloat(asset.pricePerShare).toFixed(6)} ETH</small>
                    <h4 className="font-bold text-large">{asset.name}</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    {!contentLoaded && <Skeleton className="aspect-square w-auto rounded-lg" />}
                    <div className="p-1 flex items-center">
                        {renderContent()}
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
