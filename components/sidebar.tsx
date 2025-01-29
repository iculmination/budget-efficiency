"use client";

import { navItems } from "@/constants";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="overflow-hidden w-[440px]">
      <ScrollArea className="hidden w-full h-screen p-3 lg:block">
        <div className="flex flex-col gap-2">
          <nav className="">
            <ul className="rounded-lg bg-white w-full p-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li className="p-2" key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex justify-between items-center px-4 py-4 rounded-lg",
                        item.href === pathname && "bg-blue-500 text-white"
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

          <div className="rounded-lg bg-white w-full h-80"></div>
          <div className="rounded-lg bg-white w-full h-80"></div>
          <div className="rounded-lg bg-white w-full h-80"></div>
          <div className="rounded-lg bg-white w-full h-80"></div>
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
