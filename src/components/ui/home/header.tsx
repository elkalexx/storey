import { MainNav } from "@/components/ui/home/main-nav";
import { CartSheet } from "@/components/checkout/cart-sheet";
import React from "react";

export function Header() {
    return (
        <header className="sticky top-0 z-50 h-16 w-full border-b bg-background">
            <div className="container flex h-16 items-center">
                <MainNav />
                <div className="flex flex-1 items-center justify-end space-x-4">
                    {/*Here will be cart and login as well as maybe search*/}
                    <nav className="flex items-center space-x-2">
                        <CartSheet />
                    </nav>
                </div>
            </div>
        </header>
    );
}