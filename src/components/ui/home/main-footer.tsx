import Link from "next/link";
import {footerExternalConfig} from "@/config/footer-external";
import {footerInternalConfig} from "@/config/footer-internal";

export function MainFooter() {
    return (
        <footer className="hidden w-full border-t bg-background lg:block">
            <section className="container flex gap-52 pt-8">
                <h4 className="text-base font-bold">{footerInternalConfig.name}</h4>
                {footerExternalConfig.footerNav.map((item) => (
                  <div key={item.title} className="space-y-3">
                      <h4 className="text-base font-medium">{item.title}</h4>
                      <ul className="space-y-2.5">
                          {item.items.map((value) =>(
                             <li key={value.title}>
                                 <Link
                                 href={value.link}
                                 target="_blank"
                                 rel="noreferrer"
                                 className="text-sm transition-colors text-muted-foreground hover:text-foreground"
                                 >
                                     {value.title}
                                 </Link>
                             </li>
                          ))}
                      </ul>
                  </div>
                ))}
            </section>
        </footer>
    )
}