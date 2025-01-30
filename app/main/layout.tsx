import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/toaster";

const RootLayout = ({ children }: LayoutProps) => {
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
