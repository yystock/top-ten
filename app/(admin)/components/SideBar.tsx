"use client"
import { useState } from "react";
import {BsArrowLeftShort, BsChevronDown, BsSearch} from "react-icons/bs"
import { AiFillEnvironment } from "react-icons/ai";
import {RiDashboardFill} from "react-icons/ri"
export default function SideBar() {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false)

  const Menus = [
    {title: "Dashboard"},
    {title: "Users"},
    {title: "Stars"},
    {title: "Posts", spacing: true},
    {
      title: "Blogs",
      submenu: true,
      submenuItems:[
        {title: "star 1"},
        {title: "star 2"},
        {title: "star 3"}
      ]
    },
    {title: "Analytics"},
    {title: "Inbox"},
    {title: "Setting"},
    {title: "Logout"}
  ]

  return (
    <>
       
        <div className={`
          bg-dark-purple
            h-screen
            p-5 pt-8 
            ${open ? "w-72" : "w-20"}
            duration-300 
            relative`}>
            <BsArrowLeftShort className={`
                bg-white 
                text-dark-purple 
                text-3xl 
                rounded-full
                absolute 
                -right-3 
                top-9 border 
                border-dark-purple 
                ${!open && "rotate-180"}
                cursor-pointer`}
                onClick={() => setOpen(!open)}/>
            <div className="inline-flex">
                <AiFillEnvironment className="bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2"/>
                <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${!open && "scale-0"}`}>
                    Tailwind
                </h1>
            </div>
            <div className={`flex items-center rounded-md bg-light-white mt-6 px-4 ${!open ? "px-2.5 ": "px-4"}`}>
                <BsSearch className={`text-white text-lg block float-left cursor-pointer mr-2 ${open && "mr-2"}`}/>
                <input type={"search"} placeholder="Search" className={`${!open && 'hidden'} text-base bg-transparent w-full text-white focus:outline-none`}/>
            </div>

            <ul className="pt-2">
              {Menus.map((menu, index) => (
                <>
                  <li key={index} className={`text-gray-300 text-sm flex items-center
                  gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2 ${
                    menu.spacing ? "mt-9" : "mt-2"}
                  }`}>
                    <span className="text-2xl block float-left">
                      <RiDashboardFill/>
                    </span>
                    <span className={`text-base font-medium flex-1 
                    duration-200 ${
                      !open && "hidden"
                    }`}>{menu.title}
                    </span>

                    {menu.submenu && open && (
                      <BsChevronDown className={`${submenuOpen && "rotate-180"}`} onClick={() =>{setSubmenuOpen(!submenuOpen)}}/>
                    )}

                  </li>
                  {menu.submenu && submenuOpen && open && (
                    <ul>
                      {menu.submenuItems.map((submenuItem, index) => (
                        <li key={index} className={`text-gray-300 text-sm flex items-center
                        gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md`}>
                          {submenuItem.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ))}
                
            </ul>

        </div>
      
    </>
  );
}
