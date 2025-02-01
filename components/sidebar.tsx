"use client";

import { navItems } from "@/constants";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";

const Sidebar = () => {
  const pathname = usePathname();
  const user = useUser();

  return (
    <aside className="overflow-hidden w-[27.5rem]">
      <ScrollArea className="hidden w-full h-screen p-3 lg:block">
        <div className="flex flex-col gap-2 drop-shadow-md">
          <nav className="">
            <ul className="rounded-xl bg-white w-full p-4">
              <Link href="/">
                <h2 className="text-2xl font-bold tracking-tight cursor-pointer p-2">
                  <span className="text-blue-600">Budget</span>
                  Master
                </h2>
              </Link>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li className="p-2" key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex justify-between items-center px-4 py-4 rounded-xl hover:shadow-md hover:scale-105 transition",
                        item.href === pathname &&
                          "bg-blue-500 text-white drop-shadow-lg hover:bg-blue-700"
                      )}
                    >
                      <h4 className="h4">{item.name}</h4>
                      <Icon />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="rounded-xl bg-white w-full p-6 flex items-center gap-2 lg:gap-4">
            <UserButton />
            <p className="subtitle-1 text-right truncate max-w-[16rem] cursor-default">
              Authorized as
              <b> {user.user?.username}</b>
            </p>
          </div>
          <div className="rounded-xl bg-white w-full h-80"></div>
          <div className="rounded-xl bg-white w-full h-80"></div>
          <div className="rounded-xl bg-white w-full h-80"></div>
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
