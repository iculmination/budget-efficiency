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

import { CreateTransactionProps } from "@/types";
import { Button } from "./ui/button";
import SettingsFormItem from "./form/settings-form-item";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { createTransaction } from "@/lib/actions/user.actions";

export const formSchema = z.object({
  type: z.enum(["income", "expense"]),
  category: z.string().min(2, "Category is required"),
  source: z.string().optional(),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  description: z.string(),
});

const CreateTransaction = ({ children, className }: CreateTransactionProps) => {
  const [type, setType] = useState<"income" | "expense">("income");
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "income",
      category: "",
      source: "",
      amount: 0,
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      await createTransaction(values);
      
      toast({ description: "Transaction created." });
    } catch (error) {
      toast({
        description: "Could not create transaction",
        variant: "destructive",
      });
      console.log(error, "Could not create transaction");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild className={className}>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Transaction</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Type</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setType(value as "income" | "expense");
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SettingsFormItem
              control={form.control}
              name="category"
              label="Category"
              description="Transaction's category"
            />
            {type === "income" && (
              <SettingsFormItem
                control={form.control}
                name="source"
                label="Source"
                description="Income's source"
              />
            )}
            <SettingsFormItem
              control={form.control}
              name="amount"
              label="Amount"
              type="number"
              description="Transaction amount"
            />
            <SettingsFormItem
              control={form.control}
              name="description"
              label="Description"
              description="Transaction's description"
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTransaction;
