"use client";

import { PieChartComponent } from "@/components/charts/pie-chart";
import { useUserStore } from "@/zustand/store";
import Loading from "./loading";
import { currencies } from "@/constants";
import { BarChartComponent } from "@/components/charts/bar-chart";
import { LineChartComponent } from "@/components/charts/line-chart";
import { RadarChartComponent } from "@/components/charts/radar-chart";
import { TooltipChartComponent } from "@/components/charts/tooltip-chart";
import { List } from "@/components/form/list";
import DateComponent from "@/components/date";

const MainPage = () => {
  const data = useUserStore((state) => state.user);

  if (!data) {
    return <Loading />;
  }

  const currency =
    currencies.find((cur) => cur.code === data.currency)?.symbol_native || "";

  return (
    <main className="w-full h-full">
      <div className="grid grid-cols-6 grid-rows-3 w-full h-full gap-6">
        <div className="p-6">
          <h1 className="h1 text-6xl">Dashboard</h1>
          <DateComponent />
        </div>

        <div className="col-span-2 p-6 "></div>
        <div className="p-6"></div>
        <div className="p-6"></div>

        <BarChartComponent data={data} currency={currency} />
        <PieChartComponent regulars={data.recurringExpenses} />
        <LineChartComponent />

        <div className="bg-white shadow-md rounded-xl row-span-2 p-6">
          <List className="h-full" type="regulars" simplified />
        </div>

        <RadarChartComponent transactions={data.transactions} />
        <TooltipChartComponent data={data} currency={currency} />

        <div className="bg-white shadow-md rounded-xl p-6 h-full">
          <List className="h-full" type="expenses" simplified />
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 h-full">
          <List className="h-full" type="incomes" simplified />
        </div>
      </div>
    </main>
  );
};

export default MainPage;
