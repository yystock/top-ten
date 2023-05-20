"use client"

import * as React from "react"
import Link from "next/link"
import Logo from "./Logo"

export function MobileNav() {
    const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <>
    <div className="relative hover:bg-slate-500 block md:hidden">
            <button type="button"
                 className="block py-3 px-6 border-b-2 border-transparent"
                 onClick={() => setNavbarOpen(!navbarOpen)}>
            <span className="sr-only">Mobile menu</span>
            <svg className="inline-block h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg> Menu
            </button>
    </div>
    {navbarOpen ? (
      
            <div className="fixed bg-opacity-70 w-full h-full inset-x-0 top-0">
            <div className="cursor-pointe absolute left-64 p-2" onClick={() => setNavbarOpen(!navbarOpen)}>
            <svg className="bi bi-x" width="2rem" height="2rem" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clipRule="evenodd"></path>
            <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clipRule="evenodd"></path>
            </svg>
            </div>
    

            {/* <!-- Mobile navbar --> */}
            <nav className=" flex flex-col left-0 w-64 fixed top-0  border-r border-slate-700 dark:border-slate-200 bg-white dark:bg-slate-800 h-full overflow-auto z-40">
            <div className="mb-auto">
                {/* <!--navigation--> */}
                <nav className="relative flex flex-wrap">
                <div className="text-center py-4 w-full font-bold border-b dark:border-slate-300 border-slate-700">YY</div>
                <ul className="w-full float-none flex flex-col">
                    <li className="relative">
                    <Link href="/" className="block py-2 px-5 border-b border-slate-700 dark:border-slate-300 hover:bg-slate-400">Home</Link>
                    </li>

                    {/* <!-- dropdown with submenu--> */}
                    <li className="dropdown relative">
                    <Link className="block py-2 px-5 border-b border-slate-700 dark:border-slate-300 hover:bg-slate-400" href="/news">
                        News
                    </Link>
                    </li>

                    <li className="relative">
                    <Link href="/posts" className="block py-2 px-5 border-b border-slate-700 dark:border-slate-300 hover:bg-slate-400">Posts</Link>
                    </li>

                    <li className="relative">
                    <Link href="/blog" className="block py-2 px-5 border-b border-slate-700 dark:border-slate-300 hover:bg-slate-400">Blog</Link>
                    </li>

                    <li className="relative">
                    <Link href="/shop" className="block py-2 px-5 border-b border-slate-700 dark:border-slate-300 hover:bg-slate-400">Shop</Link>
                    </li>

                    <li className="relative">
                    <Link href="/about" className="block py-2 px-5 border-b border-slate-700 dark:border-slate-300 hover:bg-slate-400">About</Link>
                    </li>

                </ul>
                </nav>
            </div>
            {/* <!-- copyright --> */}
            <div className="py-4 px-6 text-sm mt-6 text-center">
                <p>Copyright <Link href="#">New Media</Link> - All right reserved</p>
            </div>
            </nav>
        </div>
    ) : <></>}
    </>
  )
}