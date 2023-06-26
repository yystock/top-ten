"use client";

import { useTheme as useNextTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ModeToggle() {
  const { theme, setTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <label className="relative cursor-pointer items-center first-letter:inline-flex">
        <input type="checkbox" checked={theme == "dark"} onChange={(e) => setTheme(e.target.checked ? "dark" : "light")} className="sr-only" />

        <div className="flex h-8 w-14 items-center rounded-full bg-slate-200 dark:bg-blue-800">
          <div className="relative ml-1 flex h-6 w-6 items-center rounded-full bg-background transition-transform dark:translate-x-full ">
            <div className="mx-auto flex h-4/5 w-4/5 items-center justify-center ">{theme == "dark" ? <Moon /> : <Sun />}</div>
          </div>
        </div>
      </label>
    </>
  );
}
