import React, { useContext } from 'react';
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
    shares: z.number().int().positive(),
})

function SharesForm(props) {
    const { className, asset } = props;
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(FormSchema)
    });

    const { account, buyShares } = useContext(AppContext);

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            shares: 1,
        }
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <Form {...form}>
            <form className={cn("grid items-start gap-4", className)} onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    {/* courasel */}
                    <Carousel className="w-full mix-w-max">
                        <CarouselContent className="flex align-center">
                            {asset.ipfsHashes.map((ipfsImageHash, index) => (
                                <CarouselItem key={index} className="flex">
                                    <div className="p-1 flex  items-center" >
                                        <Image
                                            alt="Card background"
                                            className={`object-cover rounded-xl w-full aspect-auto max-h-screen`}
                                            src={`https://ipfs.io/ipfs/${ipfsImageHash && ipfsImageHash.split('ipfs://')[1]}`}
                                            // width={200}
                                            height={200}
                                            draggable={false}
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute top-1/2 left-0 transform -translate-y-1/2" />
                        <CarouselNext className="absolute top-1/2 right-0 transform -translate-y-1/2" />
                    </Carousel>


                    <Label htmlFor="shares">How many shares</Label>
                    <Input type="number" id="shares" {...register("shares")} />
                    {errors.shares && <FormMessage type="error">{errors.shares.message}</FormMessage>}
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