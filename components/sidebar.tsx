import { ScrollArea } from "./ui/scroll-area";

const Sidebar = () => {
  return (
    <aside className="overflow-hidden">
      <ScrollArea className="hidden w-96 border border-r-1 h-screen p-3 lg:block">
        <div className="flex flex-col gap-2">
          <div className="rounded-lg bg-gray-200 w-full h-80"></div>
          <div className="rounded-lg bg-gray-200 w-full h-80"></div>
          <div className="rounded-lg bg-gray-200 w-full h-80"></div>
          <div className="rounded-lg bg-gray-200 w-full h-80"></div>
          <div className="rounded-lg bg-gray-200 w-full h-80"></div>
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
