import { MainFooter } from "@/components/ui/home/main-footer";
import { MainNav } from "@/components/ui/home/main-nav";
import { MobileFooter } from "@/components/ui/home/mobile-footer";
import { Header } from "@/components/ui/home/header";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Header />
            <main>{children}</main>
            <MainFooter />
            <MobileFooter />
        </div>
    );
}
