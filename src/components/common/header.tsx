"use client";
import { FileText } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import NavLink from "./nav-link";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  return (
    <header className="container flex justify-between items-center px-2 py-4 lg:px-8 mx-auto">
      <div className="flex lg:flex-1">
        <NavLink href={"/"} className="flex gap-1 lg:gap-2 items-center shrink-0">
          <FileText className="h-5 w-5 lg:h-8 lg:w-8 hover:rotate-12 transition-transform duration-200 ease-in-out text-gray-900" />
          <span className="font-extrabold lg:text-xl text-gray-900">
            Synapse
          </span>
        </NavLink>
      </div>
      <div className="flex lg:justify-center gap-4 lg:gap-8 lg:items-center">
        <NavLink href={"/#pricing"}>Pricing</NavLink>
        {isLoggedIn&&<NavLink href={"/dashboard"}>Your Summaries</NavLink>}
      </div>
      <div className="flex lg:justify-end lg:flex-1">
        {isLoggedIn ? (
          <>
            <div className="flex gap-2 items-center">
              <NavLink href={"/upload"}>Upload a PDF</NavLink>
              <div>Pro</div>
              <Button>Sign Out</Button>
            </div>
          </>
        ) : (
          <>
            <div>
              <NavLink href={"/sign-in"}>Sign In</NavLink>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
