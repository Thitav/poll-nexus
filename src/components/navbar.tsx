"use client";
import { useUser } from "@/lib/getUser";
import Link from "next/link";
import { Label } from "./ui/label";
import { usePathname } from "next/navigation";

export function Navbar() {
  const user = useUser();
  const path = usePathname();

  return (
    <header className="sticky top-0 flex h-12 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden w-full flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Home
        </Link>
        <div className="flex w-full justify-end">
          {user ? (
            <div className="flex gap-6">
              <div>
                <Label className="text-muted-foreground">Logged as </Label>
                {" " + user.displayName}
              </div>
              <Link
                href={"/signout?next=" + path}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Logout
              </Link>
            </div>
          ) : (
            <Link
              href={"/signin?next=" + path}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
