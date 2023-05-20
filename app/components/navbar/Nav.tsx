import UserMenu from "./UserMenu";
import Container from "../Container";
import Logo from "./Logo";
import MenuList from "./NavList";
import { ModeToggle } from "./ModeToggle";
import { MobileNav } from "./MobileNav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";


const Nav = async() =>{
   
  const currentUser = await getServerSession(authOptions)
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-b-slate-200 dark:border-b-slate-700 dark:bg-slate-900 shadow-sm">
      <div className="py-4 ">
      <Container>
        
        <div 
          className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
          "
        >
          <MobileNav/>
          <Logo/>
          <MenuList/>
          <div className="flex items-center gap-5">
          <ModeToggle/>
          <UserMenu currentUser={currentUser?.user} />
          </div>
        </div>
      </Container>
    </div>

  </header>
  );

}

export default Nav



