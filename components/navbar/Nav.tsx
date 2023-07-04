import UserMenu from "./UserMenu";
import Logo from "./Logo";
import NavList from "./NavList";
import ModeToggle from "./ModeToggle";
import { MobileNav } from "./MobileNav";
import { getCurrentUser } from "@/lib/session";

const Nav = async () => {
  const user = await getCurrentUser();

  return (
    // sticky top-0 z-40 for sticky navbar
    <header className="fixed inset-x-0 top-0 z-[50] h-fit border-b bg-background py-2 shadow-sm">
      <div
        className="container mx-auto flex h-full 
          max-w-7xl items-center
          justify-between
          gap-3
        "
      >
        <MobileNav />
        <Logo />
        <NavList />
        <div className="flex items-center gap-5">
          <ModeToggle />

          <UserMenu currentUser={user} />
        </div>
      </div>
    </header>
  );
};

export default Nav;
