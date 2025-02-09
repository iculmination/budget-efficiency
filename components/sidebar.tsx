"use client";

import { navItems } from "@/constants";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import CreateTransaction from "./create-transaction";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { deleteAccount } from "@/lib/actions/user.actions";

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

          <div className="rounded-xl bg-white w-full p-6">
            <h3 className="h3 mb-4">Account</h3>
            <div className="gap-2 lg:gap-4 flex items-center">
              <UserButton />
              <p className="subtitle-1 text-right truncate max-w-[16rem] cursor-default">
                Authorized as
                <b> {user.user?.username}</b>
              </p>
            </div>
          </div>
          <div className="rounded-xl bg-white w-full p-6">
            <h3 className="h3 mb-4">Notifications</h3>
            <ol className="flex flex-col items-center gap-2 lg:gap-4">
              <li className="w-full">$1200 to your goal</li>
              <li className="w-full">16 days to salary</li>
              <li className="w-full">Reached month expenses limit</li>
            </ol>
          </div>
          <div className="rounded-xl bg-white w-full p-6">
            <h3 className="h3 mb-4">Quick Actions</h3>
            <div className="flex flex-col items-center gap-2 lg:gap-4">
              <CreateTransaction>
                <Button className="w-full">New Transaction</Button>
              </CreateTransaction>
              <Button className="w-full" variant="secondary">
                Export Data
              </Button>
              <Button className="w-full" variant="secondary" asChild>
                <SignOutButton>Sign Out</SignOutButton>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" variant="destructive">
                    Delete My Account
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="destructive">Cancel</Button>
                    </DialogClose>
                    <Button onClick={deleteAccount}>I&apos;m sure</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="rounded-xl bg-white w-full p-6">
            <h3 className="h3">&copy; 2025 All Rights Reserved</h3>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
