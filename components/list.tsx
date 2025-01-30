import { X } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

const ListItem = () => {
  return (
    <li className="flex w-full items-center justify-between py-2 px-4 hover:bg-gray-50/50 transition">
      <div className="flex items-center w-[93%]">
        <p className="subtitle-1 w-20">200</p>
        <p className="subtitle-1 line-clamp-1">salary</p>
      </div>
      <Button
        className="size-8 hover:shadow-none"
        variant="ghost"
        type="button"
      >
        <X />
      </Button>
    </li>
  );
};

const List = () => {
  return (
    <ScrollArea className="h-40 border rounded-lg mb-2">
      <ul className="w-full">
        <ListItem />
      </ul>
    </ScrollArea>
  );
};

export { ListItem, List };
