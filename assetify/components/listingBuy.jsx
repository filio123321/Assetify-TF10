import React from 'react';
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

const FormSchema = z.object({
    shares: z.number().int().positive(),
})

function SharesForm({ className }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(FormSchema)
    });

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
                    <SharesForm />
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
                <SharesForm className="px-4" />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

// function SharesForm({ className }) {
//     return (
//         <form className={cn("grid items-start gap-4", className)}>
//             <div className="grid gap-2">
//                 <Label htmlFor="shares">How many shares</Label>
//                 {/* <Input id="pricePerShare" label="Price per share in ETH" value={pricePerShare} onChange={(e) => setPricePerShare(e.target.value)} isRequired /> */}
//                 {/* <Input type="number" id="shares" label="Shares" isRequired/> */}
//                 <Input type="number" id="shares" defaultValue="shadcn@example.com" />
//             </div>
//             {/* <div className="grid gap-2">
//                 <Label htmlFor="username">Username</Label>
//                 <Input id="username" defaultValue="@shadcn" />
//             </div> */}
//             <Button type="submit">Buy</Button>
//         </form>
//     )
// }


export default ListingBuy;