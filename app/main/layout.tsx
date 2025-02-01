"use client";

import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { getUserData } from "@/lib/actions/user.actions";
import { useUserStore } from "@/zustand/store";
import { useEffect } from "react";

const RootLayout = ({ children }: LayoutProps) => {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserData();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  });

  return (
    <div className="min-h-screen relative flex">
      <Sidebar />
      <div className="p-10 h-screen w-full overflow-hidden flex flex-col">
        {children}
      </div>
      <Toaster />
    </div>
  );
};

export default RootLayout;
