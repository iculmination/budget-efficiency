import CreateRecurringExpense from "./create-recurring-expense";
import { List } from "./form/list";
import { Button } from "./ui/button";

const Wallet = () => {
  return (
    <main className="bg-white shadow-md rounded-xl p-6 flex-grow">
      <CreateRecurringExpense className="mb-4 ml-2">
        <Button>New Recurring Expense</Button>
      </CreateRecurringExpense>
      <List type="regulars" className="border-none h-full" />
    </main>
  );
};

export default Wallet;
