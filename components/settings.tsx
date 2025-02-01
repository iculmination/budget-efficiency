"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { currencies } from "@/constants";
import { List } from "./list";
import { LoaderCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { updateUserData } from "@/lib/actions/user.actions";
import { useUserStore } from "../zustand/store.ts";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
  age: z.coerce.number().int().lte(199).positive(),
  currency: z.string().min(1),
  income: z.coerce.number().int().nonnegative(),
  savings: z.coerce.number().int().nonnegative(),
  percentageGoal: z.coerce.number().int().lte(100).positive(),
  dreamGoal: z.object({
    name: z.string().min(1, "Goal name is required"),
    amount: z.coerce.number().int().nonnegative(),
    deadline: z.coerce.date().refine((date) => date > new Date(), {
      message: "Deadline must be in the future",
    }),
  }),
});

const Settings = () => {
  const { user } = useUser();
  const userStored = useUserStore((state) => state.user);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      age: 20,
      currency: "uah",
      income: 0,
      savings: 0,
      percentageGoal: 0,
      dreamGoal: {
        name: "",
        amount: 0,
        deadline: new Date(),
      },
    },
  });

  useEffect(() => {
    if (userStored) {
      form.reset({
        username: userStored.username || "",
        email: userStored.email || "",
        age: userStored.age || 20,
        currency: userStored.currency || "uah",
        income: userStored.income || 0,
        savings: userStored.savings ?? 0,
        percentageGoal: userStored.percentageGoal?.percentage || 0,
        dreamGoal: {
          name: userStored.dreamGoals[0]?.name || "",
          amount: userStored.dreamGoals[0]?.sum || 0,
          deadline: userStored.dreamGoals[0]?.date
            ? new Date(userStored.dreamGoals[0].date)
            : new Date(),
        },
      });
    }
  }, [userStored, form.reset, form]);

  const {
    formState: { isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await user?.update({
        username: values.username,
      });

      await updateUserData({
        ...values,
        username: values.username,
      });
    } catch (error) {
      console.log(error, "Could not update user");
    }
  };

  return (
    <main className="w-full flex flex-col flex-grow">
      <div className="w-full mb-6">
        <h1 className="h1">Settings</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-3 grid-rows-1 w-full gap-6 flex-grow"
        >
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="h2">Account</h2>
            <div className="flex flex-col gap-6 mt-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input placeholder="" type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Currency</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {currencies.map((el) => {
                            return (
                              <SelectItem key={el.code} value={el.code}>
                                {el.name} ({el.code})
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="h2">Finances</h2>
            <div className="flex flex-col gap-6 mt-6">
              <FormField
                control={form.control}
                name="income"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Income</FormLabel>
                    <FormControl>
                      <Input placeholder="" type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your average income.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="savings"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Savings (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="" type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your actual savings.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="">
                <List />
                <FormDescription>
                  Here is a list of your outgoings.
                </FormDescription>
              </div>
              <div className="">
                <List />
                <FormDescription>
                  Here is a list of your incomes.
                </FormDescription>
              </div>
              <div className="">
                <List />
                <FormDescription>
                  Here is a list of your regular payments.
                </FormDescription>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="h2">Goals</h2>
            <div className="flex flex-col gap-6 mt-6">
              <FormField
                control={form.control}
                name="percentageGoal"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Percentage goal, %</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dreamGoal.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main goal name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dreamGoal.amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main goal amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dreamGoal.deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deadline</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={
                          field.value
                            ? new Date(field.value).toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </main>
  );
};

export default Settings;
