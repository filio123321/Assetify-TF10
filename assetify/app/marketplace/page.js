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
            {isPending && <div>Loading assets...</div>}
            {assets.map((asset, index) => (
                // <Card key={index} className="w-56 flex flex-col items-stretch shadow-lg rounded-lg overflow-hidden"> {/* Adjusted for consistent width */}
                //     <CardHeader className=" pt-2 px-4 flex-col items-start">

                //         <h4 className="font-bold text-lg">{asset.name}</h4>
                //         <p className="text-sm uppercase font-bold">{asset.pricePerShare} ETH</p>
                //         {/* <small className="">{asset.owner}</small>
                //         <h1 className="text-sm">{JSON.stringify(asset.ipfsHashes)}</h1> */}
                //     </CardHeader>
                //     <CardBody className="overflow-visible py-2">
                //             <div className="w-full h-auto">
                //                 <Image
                //                     alt="Asset image"
                //                     className="w-full h-auto object-cover rounded-xl" // Adjusted for responsive images
                //                     src='https://ipfs.io/ipfs/QmWbYTUVV8GmB2EW8qn5CF3eF9aLW3msjr2cS2izckKadu/406679791_122102880962132522_5789972342587448293_n.jpg'
                //                 />
                //             </div>
                //         </CardBody>
                // </Card>
                <Card key={index} className="py-4">
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
