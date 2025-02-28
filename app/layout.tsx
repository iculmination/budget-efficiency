import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { LayoutProps } from "@/types";

const rubikSans = Rubik({
  variable: "--font-rubik-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${rubikSans.variable} antialiased bg-gradient-to-br from-blue-50 to-blue-100 w-[2840px] h-[1432px]`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
