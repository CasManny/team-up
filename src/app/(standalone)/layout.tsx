import { UserButton } from "@/features/auth/components/user-button";
import Link from "next/link";
import React, { PropsWithChildren } from "react";

const StandaloneLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center h-[73px]">
          <Link href={"/"}>TeamUp</Link>
          <UserButton />
        </nav>
        <div className="flex flex-col justify-center items-center py-4">
          {children}
        </div>
      </div>
    </main>
  );
};

export default StandaloneLayout;
