"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
    const pathname = usePathname();
    const isSignIn = pathname === "/sign-in"
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          <Link href={"/"}>TeamUp</Link>
          <div className="flex items-center gap-2">
            <Button variant={"secondary"} asChild>
              <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
                {pathname === "/sign-in" ? "Sign up" : "Login"}
              </Link>
            </Button>
          </div>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
