import React, { useContext, useEffect, useState } from 'react';
import { Image } from "@nextui-org/react";
import { AppContext } from "@/context/context";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from '@react-hook/media-query'
import { cn } from "@/lib/utils"

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/carousel";

const FormSchema = z.object({
    shares: z.number().int().positive().or(z.string().nonempty("Please enter a number")).transform(Number)
}).refine((data) => data.shares > 0, {
    message: "Shares must be a positive number",
    path: ["shares"],
});

function SharesForm(props) {
    const { className, asset } = props;
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(FormSchema)
    });

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            shares: 1,
        }
    });

    const { account, sellShares, error, checkUserShareOwnership, getContractBalance } = useContext(AppContext);
    const [sharesToSell, setSharesToSell] = useState(1);
    const [errorShares, setErrorShares] = useState(null);

    const [contractBalance, setContractBalance] = useState(0);

    useEffect(() => {
        getContractBalance().then(balance => setContractBalance(balance));
    }, []);

    useEffect(() => {
        const fetchSharesOwned = async () => {
            const ownedShares = await checkUserShareOwnership(asset.assetId);
            if (parseInt(ownedShares, 10) < sharesToSell) {
                setErrorShares("You do not own enough shares to sell this amount.");
            } else {
                setErrorShares(null);
            }
        };
        if (account && asset) {
            fetchSharesOwned();
        }
    }, [sharesToSell, account, asset]);

    useEffect(() => {
        const fetchContractBalance = async () => {
            const balance = await getContractBalance();
            setContractBalance(balance);
        };
        fetchContractBalance();
    }, []);

    const onSubmit = async () => {
        if (sharesToSell > 0 && parseFloat(sharesToSell) <= parseFloat(asset.sharesAvailable)) {
            await sellShares(asset.assetId, sharesToSell);
        } else {
            console.error("Invalid number of shares to sell");
        }
    };



    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className={cn("grid items-start gap-4", className)}>
                <div className="grid gap-2">
                    {/* <Carousel className="w-full max-w-full overflow-hidden">
                    <CarouselContent className="flex align-center">
                        {asset.ipfsHashes.map((ipfsImageHash, index) => (
                            <CarouselItem key={index} className="flex justify-center items-center p-1">
                                <Image
                                    alt="Asset Image"
                                    className="object-cover rounded-xl max-h-[80vh] w-auto"
                                    src={`https://ipfs.io/ipfs/${ipfsImageHash.split('ipfs://')[1]}`}
                                    draggable={false}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel> */}
                    <FormField
                        control={form.control}
                        error={errors.shares}
                        name="shares"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="shares">Number of shares to sell {contractBalance}</FormLabel>
                                <Input
                                    type="number"
                                    id="shares"
                                    {...register("shares", {
                                        required: "Number of shares is required",
                                        min: {
                                            value: 1,
                                            message: "At least one share must be sold"
                                        },
                                        validate: value => parseInt(value, 10) <= parseInt(asset.sharesAvailable, 10) || "You cannot sell more shares than you own"
                                    })}
                                    onChange={(e) => setSharesToSell(e.target.value)}
                                    value={sharesToSell}
                                />
                                {errors.shares && <FormMessage type="error">{errors.shares.message}</FormMessage>}
                                {errorShares && <FormMessage type="error">{errorShares}</FormMessage>}
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Sell</Button>
                </div>
            </form>
        </Form>
    );
}



const ListingSell = (props) => {
    const { open, setOpen, asset } = props;
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Sell {asset.name}</DialogTitle>
                        <DialogDescription>
                            Sell shares of this asset. You currently own {asset.sharesAvailable} shares. Price per share: {asset.pricePerShare} ETH.
                        </DialogDescription>
                    </DialogHeader>
                    <SharesForm asset={asset} />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Sell {asset.name}</DrawerTitle>
                    <DrawerDescription>
                        Sell shares of this asset. You currently own {asset.sharesAvailable} shares. Price per share: {asset.pricePerShare} ETH.
                    </DrawerDescription>
                </DrawerHeader>
                <SharesForm className="px-4" asset={asset} />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default ListingSell;