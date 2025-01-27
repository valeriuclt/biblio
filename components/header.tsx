'use client'
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import Image from "next/image"; 
import { usePathname } from "next/navigation";
import { cn, getInitials } from "@/lib/utils";
import { Session } from "next-auth";

const Header = ({session}:{session:Session}) => {
  const pathname = usePathname();
  
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/"> Carti destepte
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>

      <ul className="flex flex-row items-center gap-8">
        <li>
          {/* <form
            // action={async () => {
            //   "use server";
            //   await signOut();
            // }}
            className="mb-10"
          >
            <Button>Logout</Button>
          </form> */}
          <Link href="/library" className={cn(pathname === "/library" ? "text-light-200" : "text-light-100")}>
          Library </Link>
        </li>
        <li>
          <Link href="/my-profile">
          <Avatar>
            
            <AvatarFallback className="bg-amber-200" >{getInitials(session?.user?.name ||"OO")}</AvatarFallback>
          </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;