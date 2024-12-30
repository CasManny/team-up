"use client";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="h-screen flex gap-y-4 flex-col items-center justify-center">
      <AlertTriangle className="size-6" />
      <p className="text-sm text-muted-foreground">something went wrong</p>
      <Button variant={'secondary'} className="" asChild size={'sm'} >
        <Link href={'/'}>Back to Home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
