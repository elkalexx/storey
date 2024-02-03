import {MainFooter} from "@/components/ui/home/main-footer";
import {MobileFooter} from "@/components/ui/home/mobile-footer";

export default function HomeLayout({children}: { children: React.ReactNode }) {
    return (
        <div>
            <main>{children}</main>
            <MainFooter/>
            <MobileFooter/>
        </div>
    )
}