'use client'
import { useContext } from "react";

import { AppContext } from "@/context/context";

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from "@/components/ui/textarea"



export default function CreateListing() {
    const {
        account, connectWallet, error, balance, count,
        refreshCounter, incrementCounter, setNumber
    } = useContext(AppContext);



    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="box" >
                {
                    account ? (
                        <>
                            <div>{account}</div>
                            <div>{balance}</div>
                        </>
                    ) : (
                        <Button onClick={connectWallet}>Connect Wallet</Button>
                    )
                }
            </div>
        </main >
    );
}
