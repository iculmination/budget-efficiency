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
