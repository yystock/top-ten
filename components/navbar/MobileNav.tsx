"use client";

import * as React from "react";
import Link from "next/link";
import { siteNav } from "@/config/site";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function MobileNav() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="relative block hover:bg-slate-500 md:hidden">
        <button type="button" className="block border-b-2 border-transparent px-6 py-3" onClick={() => setNavbarOpen(!navbarOpen)}>
          <span className="sr-only">Mobile menu</span>
          <svg
            className="mr-2 inline-block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>{" "}
          Menu
        </button>
      </div>
      {navbarOpen ? (
        <div className="fixed inset-x-0 top-0 h-full w-full bg-opacity-70">
          <div className="cursor-pointe absolute left-64 p-2" onClick={() => setNavbarOpen(!navbarOpen)}>
            <svg className="bi bi-x" width="2rem" height="2rem" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clipRule="evenodd"></path>
              <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clipRule="evenodd"></path>
            </svg>
          </div>

          {/* <!-- Mobile navbar --> */}
          <nav className=" border-lg fixed left-0 top-0 z-40 flex  h-full w-64 flex-col overflow-auto bg-background">
            <div className="mb-auto">
              {/* <!--navigation--> */}
              <nav className="relative flex flex-wrap">
                <div className="w-full border border-b py-4 text-center font-bold ">YY</div>
                <ul className="float-none flex w-full flex-col">
                  {/* <!-- dropdown with submenu--> */}
                  {siteNav.map((item, index) => (
                    <li>
                      <Link
                        key={index}
                        href={item.href}
                        className={cn(
                          "block border border-b px-5 py-2 hover:bg-slate-400 ",
                          pathname !== "/" && item.href.startsWith(`${pathname}`)
                            ? "border-b-2 border-foreground py-2 text-foreground"
                            : "text-foreground/60"
                        )}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            {/* <!-- copyright --> */}
            <div className="mt-6 px-6 py-4 text-center text-sm">
              <p>
                Copyright <Link href="#">New Media</Link> - All right reserved
              </p>
            </div>
          </nav>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
