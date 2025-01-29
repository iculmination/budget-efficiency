import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/toaster";

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen relative flex">
      <Sidebar />
      <div className="p-3 min-h-screen w-full overflow-x-hidden">
        {children}
      </div>
      <Toaster />
    </div>
  );
};

export default RootLayout;
