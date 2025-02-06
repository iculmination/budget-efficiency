import { FullUser, ListItemData, ListProps } from "@/types";
import { RecurringExpense, Transaction } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const transformUserData = (data: FullUser) => {
  const user = {
    username: data.username,
    email: data.email,
    age: data.age,
    currency: data.currency,
    income: data.income,
    savings: data.savings,
    percentageGoal: data.percentageGoal,
  };

  const dreamGoal = {
    name: data.dreamGoal?.name || "",
    sum: data.dreamGoal?.sum || 0,
    progress: 0,
    date: data.dreamGoal?.date || new Date(),
  };

  return { user, dreamGoal };
};

export const normalizeData = (
  transactions: Transaction[],
  recurringExpenses: RecurringExpense[],
  type: ListProps["type"]
): ListItemData[] => {
  
  switch (type) {
    case "expenses":
      return transactions
        .filter((el) => el.type === "expense")
        .map((el) => ({ id: el.id, type: el.type, amount: el.amount }));
    case "incomes":
      return transactions
        .filter((el) => el.type === "income")
        .map((el) => ({ id: el.id, type: el.type, amount: el.amount }));
    case "transactions":
      return transactions.map((el) => ({
        id: el.id,
        type: el.type,
        amount: el.amount,
      }));
    case "regulars":
      return recurringExpenses.map((el) => ({
        id: el.id,
        type: el.nextPaymentDate,
        amount: el.amount,
      }));
    default:
      return [];
  }
};
