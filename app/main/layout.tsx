"use client";

import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { getUserData } from "@/lib/actions/user.actions";
import { LayoutProps } from "@/types";
import { useUserStore } from "@/zustand/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RootLayout = ({ children }: LayoutProps) => {
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserData();

        if (userData) {
          setUser(userData);
        } else {
          router.push("/main/settings");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="relative flex">
      <Sidebar />
      <div className="p-10 w-full overflow-hidden flex flex-col">
        {children}
      </div>
      <Toaster />
    </div>
  );
};

export default RootLayout;
