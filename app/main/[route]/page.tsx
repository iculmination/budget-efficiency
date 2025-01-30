import Budget from "@/components/budget";
import Savings from "@/components/savings";
import Settings from "@/components/settings";
import Transactions from "@/components/transactions";
import Wallet from "@/components/wallet";
import { notFound } from "next/navigation";

const DynamicRoutePage = async ({ params }: ParamProps) => {
  const route = ((await params)?.route as string) || "";

  const components: Record<string, React.FC> = {
    wallet: Wallet,
    transactions: Transactions,
    budget: Budget,
    savings: Savings,
    settings: Settings,
  };

  const Component = components[route];

  if (!Component) {
    notFound();
  }

  return <Component />;
};

export default DynamicRoutePage;
