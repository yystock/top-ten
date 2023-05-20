"use client"

import { useTheme as useNextTheme } from "next-themes"

const SunIcon = () => {
    return (
      <svg width={24} height={24} viewBox="0 0 24 24" className="bg-transparent">
        <g fill="black">
          <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
          <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
        </g>
      </svg>
    );
  };
  
  const MoonIcon = () => {
    return (
      <svg width={24} height={24} viewBox="0 0 24 24" className="bg-transparent">
        <path
          d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
          fill="#FFFFFF"
        />
      </svg>
    );
  };

  export function ModeToggle(){
    const { theme, setTheme } = useNextTheme()
    return  (
    <label className="flex items-center cursor-pointer">
    <div className="relative">
      <input type="checkbox" checked={theme == "dark"? true : false} onChange={(e) => setTheme(e.target.checked ? "dark" : "light")} className="sr-only"/>

      <div className="block bg-slate-200 w-14 h-8 rounded-full dark:bg-blue-700"></div>
      <div className="absolute left-1 top-1 bg-white w-6 h-6 rounded-full dark:translate-x-full transition-transform dark:bg-black "><div className="absolute items-center flex justify-center left-0.5 top-0.5 h-3/4 w-3/4 ">{theme == "dark"?<MoonIcon/>:<SunIcon/>}</div></div>
    </div>
    </label>
    )
  }

