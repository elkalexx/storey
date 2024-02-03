"use client"

import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {footerInternalConfig} from "@/config/footer-internal";
import {footerExternalConfig} from "@/config/footer-external";
import Link from "next/link";

export function MobileFooter() {
    return (
        <footer className="lg:hidden w-full border-t bg-background">
            <section className="container pt-8">
                <h4 className="text-base font-bold">{footerInternalConfig.name}</h4>
                {footerExternalConfig.footerNav.map((item) => (
                    <Accordion key={item.title} type="single" collapsible className="w-full mx-0 ">
                            <AccordionItem key={item.title} value={item.title}>
                                <AccordionTrigger className="text-base font-bold">{item.title}</AccordionTrigger>
                                <ul className="spacey-2.5">
                                <AccordionContent>
                                    {item.items.map((value) => (
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
                                </AccordionContent>
                                </ul>
                            </AccordionItem>
                    </Accordion>
                ))}
            </section>
        </footer>
    )
}