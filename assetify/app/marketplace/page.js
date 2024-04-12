'use client'
import { useContext, useState, useEffect, useTransition } from "react";
import { AppContext } from "@/context/context";

import MarketListing from "@/components/marketListing";

export default function Marketplace() {
    const {
        account, fetchAllAssets
    } = useContext(AppContext);

    const [assets, setAssets] = useState([]);
    const [isPending, startTransition] = useTransition();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (account) {
            startTransition(() => {
                const loadAssets = async () => {
                    setIsLoading(true);
                    const fetchedAssets = await fetchAllAssets();
                    setAssets(fetchedAssets || []);
                    setIsLoading(false); // Set loading to false here
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

            {/* Grid container with responsive adjustments */}
            <div className=" columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-x-4 gap-y-8 text-center items-center justify-center"> {/* Adjusted for responsiveness */}
                {isLoading ? (
                    <p>Loading assets...</p>
                ) : (
                    assets.length === 0 ? (
                        <p>No assets available</p>
                    ) : (
                        assets.map((asset, index) => (
                            <MarketListing key={index} asset={asset} />
                        ))

                    )
                )}
            </div>
        </main>
    );

}
