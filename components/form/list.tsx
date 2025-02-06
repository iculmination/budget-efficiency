"use client";

import { X } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { ListItemData, ListProps } from "@/types";
import { cn, normalizeData } from "@/lib/utils";
import { useUserStore } from "@/zustand/store";

const ListItem = ({ data }: { data: ListItemData }) => {
  return (
    <li className="flex w-full items-center justify-between py-2 px-4 hover:bg-gray-50/50 transition">
      <div className="flex items-center w-[93%]">
        <p className="subtitle-1 w-20">200</p>
        <p className="subtitle-1 line-clamp-1">{data.amount}</p>
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

const List = ({ className, description, type }: ListProps) => {
  const transactions = useUserStore((state) => state.user?.transactions || []);
  const recurringExpenses = useUserStore(
    (state) => state.user?.recurringExpenses || []
  );

  const data = normalizeData(transactions, recurringExpenses, type);

  return (
    <div className="h-full">
      <ScrollArea className={cn("h-40 border rounded-lg mb-2", className)}>
        <ul className="w-full">
          {data.map((item) => (
            <ListItem key={item.id} data={item} />
          ))}
        </ul>
      </ScrollArea>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        {description}
      </p>
    </div>
  );
};

export { ListItem, List };
