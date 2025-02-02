"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { useUserStore } from "@/zustand/store";

export const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
  age: z.coerce.number().int().lte(199).positive(),
  currency: z.string().min(1, { message: "Please, select your currency." }),
  income: z.coerce.number().int().nonnegative(),
  savings: z.coerce.number().int().nonnegative(),
  percentageGoal: z.coerce.number().int().lte(100).positive(),
  dreamGoal: z.object({
    name: z.string().min(1, "Goal name is required"),
    sum: z.coerce.number().int().nonnegative(),
    date: z.coerce.date().refine((date) => date > new Date(), {
      message: "Deadline must be in the future",
    }),
  }),
});

export const useSettingsForm = () => {
  const userStored = useUserStore((state) => state.user);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      age: 20,
      currency: userStored?.currency || "",
      income: 0,
      savings: 0,
      percentageGoal: 0,
      dreamGoal: {
        name: "",
        sum: 0,
        date: new Date(),
      },
    },
  });

  useEffect(() => {
    if (userStored) {
      form.reset({
        username: userStored.username,
        email: userStored.email,
        age: userStored.age,
        currency: userStored.currency.toUpperCase(),
        income: userStored.income,
        savings: userStored.savings ?? 0,
        percentageGoal: userStored.percentageGoal || 0,
        dreamGoal: {
          name: userStored.dreamGoal?.name,
          sum: userStored.dreamGoal?.sum,
          date: userStored.dreamGoal?.date
            ? new Date(userStored.dreamGoal.date)
            : new Date(),
        },
      });
    }
  }, [userStored, form.reset, form]);

  return form;
};
