import CreateTransaction from "./create-transaction";
import { List } from "./form/list";
import { Button } from "./ui/button";

const Transactions = () => {
  return (
    <main className="bg-white shadow-md rounded-xl p-6 flex-grow">
      <CreateTransaction className="mb-4 ml-2">
        <Button>New Transaction</Button>
      </CreateTransaction>
      <List type="transactions" className="border-none h-full" />
    </main>
  );
};

export default Transactions;
