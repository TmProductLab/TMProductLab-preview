"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "@/components/ui/navigation-menu";

const navigation = [
  ["Work", "/work"],
  ["Labs", "/labs"],
  ["Process", "/process"],
  ["About", "/about"],
] as const;

export function SiteNavigation({ labs }: { labs: { slug: string; name: string }[] }) {
  const pathname = usePathname();
  const mobileMenu = useRef<HTMLDetailsElement>(null);
  const closeMobileMenu = () => { if (mobileMenu.current) mobileMenu.current.open = false; };
  return (
    <>
    <NavigationMenu className="site-nav" aria-label="Main navigation" viewport={false} delayDuration={100}>
      <NavigationMenuList className="site-nav-list">
      {navigation.map(([label, href]) => {
        const active = pathname === href || pathname?.startsWith(`${href}/`);
        if (href === "/labs") {
          return (
            <NavigationMenuItem key={href}>
              <NavigationMenuTrigger className="labs-nav-trigger" data-active={active}>{label}</NavigationMenuTrigger>
              <NavigationMenuContent className="labs-nav-dropdown">
                <NavigationMenuLink asChild><Link href="/labs" aria-current={pathname?.replace(/\/$/, "") === "/labs" ? "page" : undefined}>All Labs</Link></NavigationMenuLink>
                {labs.map((lab) => <NavigationMenuLink asChild key={lab.slug}><Link href={`/labs/${lab.slug}`} aria-current={pathname?.replace(/\/$/, "") === `/labs/${lab.slug}` ? "page" : undefined}>{lab.name}</Link></NavigationMenuLink>)}
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        }
        return <NavigationMenuItem key={href}><NavigationMenuLink asChild className="site-nav-top-link"><Link href={href} aria-current={active ? "page" : undefined}>{label}</Link></NavigationMenuLink></NavigationMenuItem>;
      })}
      </NavigationMenuList>
    </NavigationMenu>
    <details className="mobile-navigation" ref={mobileMenu} onKeyDown={(event) => {
      if (event.key === "Escape") { closeMobileMenu(); mobileMenu.current?.querySelector("summary")?.focus(); }
    }}>
      <summary><span className="mobile-menu-open-label">Menu</span><span className="mobile-menu-close-label">Close</span><span className="mobile-menu-symbol" aria-hidden="true" /></summary>
      <nav className="mobile-menu-panel" aria-label="Mobile navigation">
        {navigation.map(([label, href]) => <Link key={href} href={href} onClick={closeMobileMenu} aria-current={pathname?.replace(/\/$/, "") === href ? "page" : undefined}>{label}<span aria-hidden="true">↗</span></Link>)}
        <details className="mobile-labs-menu">
          <summary>Explore the Labs <span aria-hidden="true">+</span></summary>
          <div>{labs.map((lab) => <Link key={lab.slug} href={`/labs/${lab.slug}`} onClick={closeMobileMenu}>{lab.name}</Link>)}</div>
        </details>
        <Link className="mobile-contact-link" href="/contact" onClick={closeMobileMenu}>Let&apos;s connect <span aria-hidden="true">↗</span></Link>
      </nav>
    </details>
    </>
  );
}
