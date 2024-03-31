"use client"

import { NextUIProvider } from '@nextui-org/react'
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";

const activeChainId = ChainId.Localhost;

export function Providers({ children }) {
    return (
        <ThirdwebProvider
            clientId="923c0163885cbdec43fe9f8f82870f09"
            network="testnet"
            desiredChainId={activeChainId}
        >
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </ThirdwebProvider>

    )
}
