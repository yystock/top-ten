"use client";
import { siteNav } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { usePathname } from "next/navigation";
const NavList = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden gap-6 md:flex">
      {siteNav.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={cn(
            "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
            pathname !== "/" && item.href.startsWith(`${pathname}`) ? "border-b-2 border-foreground py-2 text-foreground" : "text-foreground/60"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
};

export default NavList;
