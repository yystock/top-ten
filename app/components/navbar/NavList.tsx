'use client';
import MenuItem from "./MenuItem";
import { useRouter } from "next/navigation";

const MenuList = () => {
  const router = useRouter();

  return ( 
    <nav>
        <ul className="hidden md:flex flex-row gap-5 text-center relative">
            <li className="hover:text-amber-500 cursor-pointer" onClick={() => router.push('/posts')}>Posts</li>
            <li className="hover:text-amber-500 cursor-pointer" onClick={() => router.push('/news')}>News</li>
            <li className="hover:text-amber-500 cursor-pointer" onClick={() => router.push('/vote')}>Vote</li>
            <li className="hover:text-amber-500 cursor-pointer" onClick={() => router.push('/shop')}>Shop</li>
        </ul>
    </nav>
   );
}
 
export default MenuList;   
     