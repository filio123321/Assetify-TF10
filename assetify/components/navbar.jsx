"use client"

import React, { useContext, useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";

import { AppContext } from "@/context/context";
import ShortenText from "@/components/ShortenText";

export default function NavigationBar() {
    // const { account, connect, logout } = useAccount();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const {
        account, connectWallet, error, balance, count,
        refreshCounter, incrementCounter, setNumber
    } = useContext(AppContext); const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        console.log("router: ", router);
        console.log("pathname: ", pathname);
    }, [router, pathname]);

    // current page for isActive buttons

    const menuItems = [
        { label: "Home", href: "/", type: "link" },
        { label: "Marketplace", href: "/marketplace", type: "link" },
        { label: "Create a Listing", href: "/create-listing", type: "link" },
        { label: "Portfolio", href: "/portfolio", type: "link" },
        { label: "CryptiX", href: "/cryptix", type: "link" },
        { label: "About us", href: "/aboutus", type: "link" },
    ];


    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    {/* <p className="font-bold text-inherit">Assetify</p> */}
                    <Link href="/" color="foreground" size="lg">
                        Assetify
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {/* <NavbarItem isActive={pathname === "/"}> */}
                {/* <NavbarItem {...(pathname === "/" ? { isActive: true } : {})}>
                    <Link href="/" aria-current="page" {...(pathname === "/" ? {} : { color: "foreground" })}>
                        Home
                    </Link>
                </NavbarItem> */}
                <NavbarItem {...(pathname === "/marketplace" ? { isActive: true } : {})}>
                    <Link href="/marketplace" aria-current="page" {...(pathname === "/marketplace" ? {} : { color: "foreground" })}>
                        Marketplace
                    </Link>
                </NavbarItem>
                {/* <NavbarItem {...(pathname === "/portfolio" ? { isActive: true } : {})}>
                    <Link href="/portfolio" aria-current="page" {...(pathname === "/portfolio" ? {} : { color: "foreground" })}>
                        Portfolio
                    </Link>
                </NavbarItem> */}
                <NavbarItem {...(pathname === "/cryptix" ? { isActive: true } : {})}>
                    <Link href="/cryptix" aria-current="page" {...(pathname === "/cryptix" ? {} : { color: "foreground" })}>
                        CryptiX
                    </Link>
                </NavbarItem>
                <NavbarItem {...(pathname === "/aboutus" ? { isActive: true } : {})}>
                    <Link href="/aboutus" aria-current="page" {...(pathname === "/aboutus" ? {} : { color: "foreground" })}>
                        About us
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                {!account && (
                    <NavbarItem>
                        <Button onClick={connectWallet} color="primary">
                            Connect Wallet
                        </Button>
                    </NavbarItem>
                )}
                {account && (
                    <>
                        <NavbarItem>
                            {/* <Button as={Link} color="primary" href="#" variant="flat">
                                <ShortenText text={account} />
                            </Button> */}
                            <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                    <Button as={Link} color="primary" href="#" variant="flat">
                                        <ShortenText text={account} />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Profile Actions" variant="flat">
                                    <DropdownItem key="balance" className="h-14 gap-2">
                                        {/* Balance: {parseFloat(balance).toFixed(2)} ETH */}
                                        <p className="font-semibold">Balance:</p>
                                        <p className="font-semibold">{parseFloat(balance).toFixed(5)} ETH</p>
                                    </DropdownItem>
                                    <DropdownItem key="create-listing">
                                        <Link href="/create-listing" aria-current="page">
                                            Create a Listing
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem key="portfolio">
                                        <Link href="/portfolio" aria-current="page">
                                            Portfolio
                                        </Link>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </NavbarItem>
                    </>
                )}
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => {
                    if (item.type === "link") {
                        return (
                            <NavbarMenuItem key={`${item.label}-${index}`}>
                                <Link
                                    color="foreground"
                                    className="w-full"
                                    href={item.href}
                                    size="lg"
                                >
                                    {item.label}
                                </Link>
                            </NavbarMenuItem>
                        );
                    } else if (item.type === "action") {
                        // Specifically handling the logout action
                        return account && (
                            <NavbarMenuItem key={`${item.label}-${index}`}>
                                <Button
                                    color="error"
                                    className="w-full"
                                    onClick={item.action}
                                    size="lg"
                                >
                                    {item.label}
                                </Button>
                            </NavbarMenuItem>
                        );
                    }
                    return null; // For items that don't match the expected types
                })}
            </NavbarMenu>

        </Navbar >
    );
}
