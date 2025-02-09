"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import SettingsFormItem from "./form/settings-form-item";
import { useToast } from "@/hooks/use-toast";
import { createRecurringExpense } from "@/lib/actions/user.actions";
import { Input } from "./ui/input";

export const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  nextPaymentDate: z.coerce.date(),
});

const CreateRecurringExpense = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: 0,
      nextPaymentDate: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createRecurringExpense(values);
      toast({ description: "Recurring expense created." });
    } catch (error) {
      toast({
        description: "Could not create recurring expense",
        variant: "destructive",
      });
      console.error("Could not create recurring expense", error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild className={className}>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Recurring Expense</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <SettingsFormItem
              control={form.control}
              name="name"
              label="Name"
              description="Recurring expense name"
            />
            <SettingsFormItem
              control={form.control}
              name="amount"
              label="Amount"
              type="number"
              description="Expense amount"
            />
            <FormField
              control={form.control}
              name="nextPaymentDate"
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRecurringExpense;
