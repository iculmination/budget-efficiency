"use client";

import { X } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { ListProps } from "@/types";
import { cn, normalizeData } from "@/lib/utils";
import { useUserStore } from "@/zustand/store";
import { useToast } from "@/hooks/use-toast";
import { useMemo } from "react";
import { deleteTransaction } from "@/lib/actions/user.actions";
import { RecurringExpense, Transaction } from "@prisma/client";
import { currencies } from "@/constants";

const TransactionListItem = ({
  data,
  currency,
  simplified,
}: {
  data: Transaction;
  currency: string;
  simplified?: boolean;
}) => {
  const { toast } = useToast();
  const removeTransaction = useUserStore((state) => state.removeTransaction);

  const handleTransactionDelete = async () => {
    try {
      await deleteTransaction(data.id);
      removeTransaction(data.id);
      toast({ description: "Deleted successfully." });
    } catch {
      toast({ description: "Could not delete.", variant: "destructive" });
    }
  };

  const isIncome = data.type === "income";

  return (
    <li
      className={cn(
        "flex w-full items-center justify-between py-2 px-4 hover:bg-gray-50/50 transition",
        isIncome ? "hover:bg-green-50" : "hover:bg-red-50"
      )}
    >
      <div className="flex items-center w-[93%]">
        <p className="subtitle-1 w-20 truncate mr-2 capitalize">
          {data.category}
        </p>
        <p
          className={cn(
            "subtitle-1 line-clamp-1 w-24",
            isIncome ? "text-green-700" : "text-red-700"
          )}
        >
          {isIncome ? "+ " : "- "}
          {currency}
          {data.amount.toFixed(2)}
        </p>
        {!simplified && (
          <>
            <p className="subtitle-1 w-28 truncate mr-2">
              {data.date.toLocaleDateString()}
            </p>
            <p className="subtitle-1 w-20 truncate mr-2 capitalize">
              {isIncome && data.source}
            </p>
            <p className="subtitle-1 w-40 truncate mr-2 capitalize">
              {data.description}
            </p>
          </>
        )}
      </div>{" "}
      <Button
        onClick={() => handleTransactionDelete()}
        className="size-8 hover:shadow-none hover:bg-transparent hover:text-red-500"
        variant="ghost"
        type="button"
      >
        <X />
      </Button>
    </li>
  );
};

const RecurringExpenseListItem = ({
  data,
  currency,
  simplified,
}: {
  data: RecurringExpense;
  currency: string;
  simplified?: boolean;
}) => {
  const { toast } = useToast();
  const removeRecurringExpense = useUserStore(
    (state) => state.removeRecurringExpense
  );

  const handleRecurringExpenseDelete = async () => {
    try {
      await deleteTransaction(data.id);
      removeRecurringExpense(data.id);
      toast({ description: "Deleted successfully." });
    } catch {
      toast({ description: "Could not delete.", variant: "destructive" });
    }
  };

  return (
    <li
      className={cn(
        "flex w-full items-center justify-between py-2 px-4 hover:bg-gray-50/50 transition",
        "hover:bg-red-50"
      )}
    >
      <div className="flex items-center w-[93%]">
        <p
          className={cn(
            "subtitle-1 w-40 truncate mr-2 capitalize",
            simplified && "w-20"
          )}
        >
          {data.name}
        </p>
        <p className="subtitle-1 line-clamp-1 w-24 text-red-700">
          - {currency}
          {data.amount.toFixed(2)}
        </p>
        {!simplified && (
          <>
            <p className="subtitle-1 w-28 truncate mr-2">
              {new Date(data.nextPaymentDate).toLocaleDateString()}
            </p>
          </>
        )}
      </div>
      <Button
        onClick={handleRecurringExpenseDelete}
        className="size-8 hover:shadow-none hover:bg-transparent hover:text-red-500"
        variant="ghost"
        type="button"
      >
        <X />
      </Button>
    </li>
  );
};

export default RecurringExpenseListItem;

export const List = ({
  className,
  description,
  type,
  simplified,
}: ListProps) => {
  const user = useUserStore((state) => state.user);

  const data = useMemo(
    () =>
      normalizeData(
        user?.transactions || [],
        user?.recurringExpenses || [],
        type
      ),
    [user, type]
  );

  if (!user) return null;

  const currency =
    currencies.find((cur) => cur.code === user.currency)?.symbol_native || "";

  return (
    <div className="h-full">
      <ScrollArea className={cn("h-40 border rounded-lg mb-2", className)}>
        <ul className="w-full">
          {data.map((item) =>
            "type" in item ? (
              <TransactionListItem
                key={item.id}
                data={item}
                currency={currency}
                simplified={simplified}
              />
            ) : (
              <RecurringExpenseListItem
                key={item.id}
                data={item}
                currency={currency}
                simplified={simplified}
              />
            )
          )}
        </ul>
      </ScrollArea>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        {description}
      </p>
    </div>
  );
};
