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
        <main className="flex min-h-screen w-full flex-wrap justify-center p-4 gap-4"> {/* Grid layout */}

            {/* TItle */}
            <div className="w-full flex items-center justify-center mb-16">
                <div className='font-bold lg:text-5xl text-4xl text-center max-w-screen-auto drop-shadow-lg pt-8 max-w-[60%]'>
                    <p className="bg-gradient-to-r from-pink-500 to-indigo-500 inline-block text-transparent bg-clip-text">Marketplace</p>
                </div>
            </div>

            {assets.map((asset, index) => (
                <Card key={index} className="py-4 h-full" isPressable>
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className="text-tiny uppercase font-bold">Available {asset.sharesAvailable}/{asset.totalShares}</p>
                        <small className="text-default-500">{asset.pricePerShare} ETH</small>
                        <h4 className="font-bold text-large">{asset.name}</h4>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                        <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            // src='https://ipfs.io/ipfs/QmWbYTUVV8GmB2EW8qn5CF3eF9aLW3msjr2cS2izckKadu/406679791_122102880962132522_5789972342587448293_n.jpg'
                            src='https://ipfs.io/ipfs/QmQRi9Agea6V1xXxCVxuhQtQ1L1RR3orS6tANPbejtbiGc/0x0.png'
                            width={270}
                        />
                    </CardBody>
                </Card>
            ))}
        </main>
    );
}
