"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "@/components/ui/navigation-menu";

const navigation = [
  ["Work", "/work"],
  ["Labs", "/labs"],
  ["Process", "/process"],
  ["About", "/about"],
] as const;

export function SiteNavigation({ labs }: { labs: { slug: string; name: string }[] }) {
  const pathname = usePathname();
  return (
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
  );
}
