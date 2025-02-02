import { Control } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "../schemas/formSchema";

type FormValues = z.infer<typeof formSchema>;

declare interface LayoutProps {
  children: React.ReactNode;
}

declare interface ParamProps {
  params?: Promise<SegmentParams>;
}
declare interface FullUser extends User {
  percentageGoal?: percentageGoal;
  dreamGoals: DreamGoal[];
  recurringExpenses: RecurringExpense[];
  transactions: Transaction[];
}

declare interface SettingsFormItemProps {
  control: Control<FormValues>;
  name: string;
  label: string;
  description: string;
  type?: string;
}

declare interface ListProps {
  className?: string;
  description: string;
}
