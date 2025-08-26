'use client'
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";

export default function NavLink({
  href,
  children,
  className
}: {
  href: string;
  children: React.ReactNode;
    className?: string;
}) {
  const pathName = usePathname();
  const isActive = 
  pathName === href || (href !== "/" && pathName?.startsWith(href));
  return (
    <Link
      href={href}
      className={cn("transition-colors hover:text-rose-500 text-sm duration-200 text-gray-600", className, isActive && 'text-rose-500')}
    >
      {children}
    </Link>
  );
}
