"use client"

import React, { useContext, useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";

import { AppContext } from "@/context/context";
import ShortenText from "@/components/ShortenText";

export default function NavigationBar() {
    // const { account, connect, logout } = useAccount();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { account, connectWallet, error } = useContext(AppContext);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        console.log("router: ", router);
        console.log("pathname: ", pathname);
    }, [router, pathname]);

    // current page for isActive buttons

    const menuItems = [
        { label: "Profile", href: "#", type: "link" },
        { label: "Dashboard", href: "#", type: "link" },
        // Kakvito drugi linkove imam
        // { label: "Log Out", type: "action", action: logout },
    ];


    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <p className="font-bold text-inherit">Assetify</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {/* <NavbarItem isActive={pathname === "/"}> */}
                <NavbarItem {...(pathname === "/" ? { isActive: true } : {})}>
                    <Link href="#" aria-current="page" {...(pathname === "/" ? {} : { color: "foreground" })}>
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem {...(pathname === "/customers" ? { isActive: true } : {})}>
                    {/* <Link href="#" aria-current="page"> */}
                    <Link href="#" aria-current="page" {...(pathname === "/customers" ? {} : { color: "foreground" })}>
                        Customers
                    </Link>
                </NavbarItem>
                <NavbarItem {...(pathname === "/integrations" ? { isActive: true } : {})}>
                    <Link href="#" aria-current="page" {...(pathname === "/integrations" ? {} : { color: "foreground" })}>
                        Integrations
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                {/* <NavbarItem className="hidden lg:flex">
                    <Link href="#">Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem> */}
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
                            <Button as={Link} color="primary" href="#" variant="flat">
                                <ShortenText text={account} />
                            </Button>
                        </NavbarItem>
                    </>
                )}
            </NavbarContent>
            {/* <NavbarMenu>
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
            </NavbarMenu> */}

        </Navbar >
    );
}
