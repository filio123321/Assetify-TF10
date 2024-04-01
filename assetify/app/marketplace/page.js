'use client'
import { useContext, useState, useEffect, useTransition } from "react";
import { AppContext } from "@/context/context";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Image } from "@nextui-org/react";

export default function Marketplace() {
    const {
        account, fetchAllAssets
    } = useContext(AppContext);

    const [assets, setAssets] = useState([]);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (account) {
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
        <main className="min-h-screen w-full p-4">
            {/* Title */}
            <div className="w-full mb-16 flex justify-center">
                <div className='font-bold lg:text-5xl text-4xl text-center max-w-screen-lg drop-shadow-lg pt-8'>
                    <p className="bg-gradient-to-r from-pink-500 to-indigo-500 inline-block text-transparent bg-clip-text">Marketplace</p>
                </div>
            </div>

            {/* Grid container */}
            <div className="columns-3 md:columns-4 lg:columns-5 gap-x-4 gap-y-10"> {/* Apply column layout here */}
                {assets.map((asset, index) => (
                    <Card key={index} className="py-4 h-full break-inside-avoid mb-4" isPressable> {/* Added margin-bottom to each card */}
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <p className="text-tiny uppercase font-bold">Available {asset.sharesAvailable}/{asset.totalShares}</p>
                            <small className="text-default-500">{asset.pricePerShare} ETH</small>
                            <h4 className="font-bold text-large">{asset.name}</h4>
                        </CardHeader>
                        <CardBody className="overflow-visible py-2">
                            <Image
                                alt="Card background"
                                className="object-cover rounded-xl"
                                src={`https://ipfs.io/ipfs/${asset.ipfsHashes[0] && asset.ipfsHashes[0].split('ipfs://')[1]}`}
                                width={270}
                            />
                        </CardBody>
                    </Card>
                ))}
            </div>
        </main>
    );

}
