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
  };

  const percentageGoal = {
    percentage: data.percentageGoal,
    sum: (data.income * data.percentageGoal) / 100,
    progress: 0,
  };

  const dreamGoal = {
    name: data.dreamGoal.name,
    sum: data.dreamGoal.amount,
    progress: 0,
    date: data.dreamGoal.deadline,
  };

  return { user, percentageGoal, dreamGoal };
};
