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

    const { account, buyShares, error } = useContext(AppContext);
    const [sharesToBuy, setSharesToBuy] = useState(1);
    const [errorShares, setErrorShares] = useState(null);

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            shares: 1,
        }
    });

    const onSubmit = (data) => {
        buyShares(asset.assetId, data.shares, parseFloat(sharesToBuy) * parseFloat(asset.pricePerShare));
    };

    useEffect(() => {
        if (parseFloat(sharesToBuy) > parseFloat(asset.sharesAvailable)) {
            // setSharesToBuy(asset.sharesAvailable);
            setErrorShares("Not enough shares available");
            // console.log("Shares to buy", sharesToBuy, asset.sharesAvailable, parseFloat(sharesToBuy) > parseFloat(asset.sharesAvailable));
        } else {
            setErrorShares(null);
        }
    }, [sharesToBuy, asset.sharesAvailable]);

    return (
        <Form {...form}>
            <form className={cn("grid items-start gap-4", className)} onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    {/* courasel */}
                    <Carousel className="w-full max-w-full overflow-hidden">
                        <CarouselContent className="flex align-center">
                            {asset.ipfsHashes.map((ipfsImageHash, index) => (
                                <CarouselItem key={index} className="flex justify-center items-center p-1">
                                    <Image
                                        alt="Card background"
                                        className="object-cover rounded-xl max-h-[80vh] w-auto"
                                        src={`https://ipfs.io/ipfs/${ipfsImageHash.split('ipfs://')[1]}`}
                                        draggable={false}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10" />
                        <CarouselNext className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10" />
                    </Carousel>



                    {/* <Label htmlFor="shares">How many shares</Label>
                    <Input type="number" id="shares" {...register("shares")} /> */}

                    <FormField
                        control={form.control}
                        error={errors.shares}
                        name="shares"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="shares">How many shares {asset.pricePerShare}</FormLabel>
                                <FormControl>
                                    {/* <Input placeholder={asset.sharesAvailable} {...field} /> */}
                                    <Input
                                        placeholder={asset.sharesAvailable}
                                        {...field}
                                        onChange={(e) => setSharesToBuy(e.target.value)} value={sharesToBuy}
                                        {...register("shares", {
                                            onChange: (e) => setSharesToBuy(e.target.value), // Update state on change
                                        })}
                                    />
                                </FormControl>
                                {/* <FormDescription>ETH {asset.pricePerShare}</FormDescription> */}
                                {errors.shares && <FormMessage type="error" className="text-red-500">{errors.shares.message}</FormMessage>}
                                {errorShares && <FormMessage type="error" className="text-red-500">{errorShares}</FormMessage>}
                                {/* {error && <FormMessage type="error" className="text-red-500">{error.data.message}</FormMessage>} */}

                                <div className="flex justify-between">
                                    <FormMessage className="text-white">EST. PRICE</FormMessage>
                                    <FormMessage className="text-white">ETH {(asset.pricePerShare * sharesToBuy).toFixed(3)}</FormMessage>
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormMessage />
                </div>
                <Button type="submit">Buy</Button>
            </form>
        </Form>
    )
}



const ListingBuy = (props) => {
    const { open, setOpen, asset } = props;
    const isDesktop = useMediaQuery("(min-width: 768px)")


    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Buy {asset.name}</DialogTitle>
                        <DialogDescription>
                            Purchase shares of this asset. Currently {asset.sharesAvailable} shares available. Price per share: {asset.pricePerShare} ETH.
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
                    <DrawerTitle>Buy {asset.name}</DrawerTitle>
                    <DrawerDescription>
                        Purchase shares of this asset. Currently {asset.sharesAvailable} shares available. Price per share: {asset.pricePerShare} ETH.
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


export default ListingBuy;