"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { List } from "./form/list";
import { useUser } from "@clerk/nextjs";
import { updateUserData } from "@/lib/actions/user.actions";
import { formSchema, useSettingsForm } from "@/hooks/use-settings-form";
import SettingsFormItem from "./form/settings-form-item";
import SubmitButton from "./form/submit-button";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/zustand/store";

const Settings = () => {
  const { user } = useUser();
  const form = useSettingsForm();
  const { toast } = useToast();
  const { setUser } = useUserStore();

  const {
    formState: { isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      await user?.update({
        username: values.username,
      });

      await updateUserData({
        ...values,
        username: values.username,
      });

      setUser(values);

      toast({ description: "Your profile successfully updated." });
    } catch (error) {
      toast({
        description: "Could not update user",
        variant: "destructive",
      });
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
          <div className="bg-white shadow-md rounded-xl p-6 relative">
            <h2 className="h2">Account</h2>
            <div className="flex flex-col gap-6 mt-6">
              <SettingsFormItem
                control={form.control}
                label="Username"
                name="username"
                description="This is your display name."
              />
              <SettingsFormItem
                control={form.control}
                label="Email"
                name="email"
                description="This is your email."
              />
              <SettingsFormItem
                control={form.control}
                label="Age"
                name="age"
                description="This is your age."
              />
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Currency</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || form.getValues("currency")}
                    >
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
            </div>
            <SubmitButton isSubmitting={isSubmitting} />
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 relative">
            <h2 className="h2">Finances</h2>
            <div className="flex flex-col gap-6 mt-6">
              <SettingsFormItem
                control={form.control}
                label="Income"
                name="income"
                type="number"
                description="This is your average income."
              />
              <SettingsFormItem
                control={form.control}
                label="Savings (optional)"
                name="savings"
                type="number"
                description="This is your actual savings."
              />
              <List description="Here is a list of your outgoings." />
              <List description="Here is a list of your incomes." />
              <List description="Here is a list of your regular payments." />
            </div>
            <SubmitButton isSubmitting={isSubmitting} />
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 relative">
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
              <SettingsFormItem
                control={form.control}
                label="Main goal name"
                name="dreamGoal.name"
                description="This is your goal's name."
              />
              <SettingsFormItem
                control={form.control}
                label="Main goal amount"
                name="dreamGoal.sum"
                type="number"
                description="This is how much your main goal costs."
              />
              <FormField
                control={form.control}
                name="dreamGoal.date"
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
            <SubmitButton isSubmitting={isSubmitting} />
          </div>
        </form>
      </Form>
    </main>
  );
};

export default Settings;
