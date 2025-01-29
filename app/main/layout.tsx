import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/toaster";

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen relative flex">
      <Sidebar />
      <div className="p-3">{children}</div>
      <Toaster />
    </div>
  );
};

export default RootLayout;
