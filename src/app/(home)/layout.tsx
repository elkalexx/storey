import {MainFooter} from "@/components/ui/home/main-footer";
import {MobileFooter} from "@/components/ui/home/mobile-footer";
import {MainNav} from "@/components/ui/home/main-nav";

export default function HomeLayout({children}: { children: React.ReactNode }) {
    return (
        <div>
            <MainNav/>
            <main>{children}</main>
            <MainFooter/>
            <MobileFooter/>
        </div>
    )
}