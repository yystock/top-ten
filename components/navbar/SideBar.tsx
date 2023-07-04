"use client";
import { useState } from "react";
import { BsArrowLeftShort, BsChevronDown } from "react-icons/bs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { DashboardMenu } from "@/config/dashboard";
import { Icons } from "../Icons";
import { cn } from "@/lib/utils";
export default function SideBar() {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={`
        min-h-screen
          bg-background 
          ${open ? "w-60" : "w-20"}
          relative 
          duration-300`}
    >
      <BsArrowLeftShort
        className={`
              absolute
              -right-1 
              top-2
              rounded-full 
              border
              bg-background 
              text-3xl
              text-foreground hover:bg-accent
              ${!open && "rotate-180"}
              cursor-pointer`}
        onClick={() => setOpen(!open)}
      />

      <ul className="pt-2 ">
        {DashboardMenu.map((menu, index) => {
          const Icon = Icons[menu.icon || "dashboard"];
          return (
            <li key={index}>
              <Link
                className={cn(
                  "flex cursor-pointer items-center gap-x-4 rounded-md p-2 text-sm text-foreground hover:border-2 hover:bg-accent",
                  menu.spacing ? "mt-9" : "mt-2",
                  pathname === menu.link ? "bg-accent text-accent-foreground" : "text-foreground/60"
                )}
                href={menu.link}
              >
                <span className="float-left block text-2xl">{Icon && <Icon className="mr-2 h-4 w-4" />}</span>
                <span className={cn("flex-1 text-base font-medium duration-200", !open && "hidden")}>{menu.title}</span>

                {menu.submenu && open && (
                  <BsChevronDown
                    className={`${submenuOpen && "rotate-180"}`}
                    onClick={() => {
                      setSubmenuOpen(!submenuOpen);
                    }}
                  />
                )}
              </Link>
              {menu.submenuItems && submenuOpen && open && (
                <ul key={index + "-"}>
                  {menu.submenuItems.map((submenuItem, index) => (
                    <Link
                      key={"sub:" + index}
                      href={submenuItem.link}
                      className={`hover:bg-light-white flex cursor-pointer items-center
                      gap-x-4 rounded-md p-2 px-5 text-sm text-gray-300`}
                    >
                      {submenuItem.title}
                    </Link>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
