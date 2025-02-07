"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { handleSignOut } from "@/lib/actions/auth";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { getInitials } from "@/lib/utils";

const Header = () => {
  const { data: session } = useSession();
  console.log('header',session?.user)
  return (
    //     <header className="my-10 flex justify-between gap-5">
    //        <Link href="/">
    //          <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
    //       </Link>

    //     {session?.user?.email === "valeriucolt@gmail.com" && (
    //       <Link
    //         href="/admin"
    //         className="mb-4 inline-block"
    //       >
    //         Admin Panel
    //       </Link>
    //     )}
    //  <ul className="flex flex-row items-center gap-8">
    // <li>

    // <Button
    //         onClick={() => handleSignOut()}
    //         className="mb-10"
    //         >
    //         Logout
    //       </Button>
    //           </li>
    //           <li>

    //        <Link href="/my-profile">
    //                 <Avatar>

    //                     <AvatarFallback className="bg-amber-200" >{getInitials(session?.user?.name ||"OO")}</AvatarFallback>
    //                  </Avatar>
    //        </Link>
    //           </li>
    //   </ul>
    //   </header>
    //     <header className="my-10 flex justify-between gap-5">
    //        <Link href="/">
    //          <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
    //       </Link>

    //     {session?.user?.email === "valeriucolt@gmail.com" && (
    //       <Link
    //         href="/admin"
    //         className="mb-4 inline-block"
    //       >
    //         Admin Panel
    //       </Link>
    //     )}
    //  <ul className="flex flex-row items-center gap-8">
    // <li>

    // <Button
    //         onClick={() => handleSignOut()}
    //         className="mb-10"
    //         >
    //         Logout
    //       </Button>
    //           </li>
    //           <li>

    //        <Link href="/my-profile">
    //                 <Avatar>

    //                     <AvatarFallback className="bg-amber-200" >{getInitials(session?.user?.name ||"OO")}</AvatarFallback>
    //                  </Avatar>
    //        </Link>
    //           </li>
    //   </ul>
    //   </header>

    <header className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
        </Link>

        <div className="flex items-center gap-6">
          {session?.user?.email === "valeriucolt@gmail.com" && (
            <Link
              href="/admin"
              className="rounded-md bg-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary/80"
            >
              Admin 
            </Link>
          )}
          <nav>
            <ul className="flex items-center gap-4">
              <li>
                <Button
                  onClick={() => handleSignOut()}
                  variant="ghost"
                  className="text-sm font-medium"
                >
                  Logout
                </Button>
              </li>
              <li>
                <Link
                  href="/my-profile"
                  className="block rounded-full transition-opacity hover:opacity-80"
                >
                  <Avatar>
                    <AvatarFallback className="bg-amber-200">
                      {getInitials(session?.user?.name || "OO")}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
