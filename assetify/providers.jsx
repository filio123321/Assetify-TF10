"use client"

import { NextUIProvider } from '@nextui-org/react'
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
// import { QueryClient, QueryClientProvider } from "react-query";
// import { QueryClient, QueryClientProvider } from "react-query";
import { QueryClientProvider } from '@tanstack/react-query';


// const activeChainId = ChainId.Localhost;
// const queryClient = new QueryClient({
//     defaultOptions: {
//         queries: {
//             refetchOnWindowFocus: false, // configure as per your needs
//         },
//     },
// })

export function Providers({ children }) {
    return (
        <ThirdwebProvider
            // desiredChainId={activeChainId}
            clientId="923c0163885cbdec43fe9f8f82870f09"
        // network="testnet"
        >
            <NextUIProvider>
                {/* <QueryClientProvider client={queryClient}> */}
                    {children}
                {/* </QueryClientProvider> */}
            </NextUIProvider>
        </ThirdwebProvider>
    )
}
