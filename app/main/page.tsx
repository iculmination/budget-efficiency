"use client";

import { PieChartComponent } from "@/components/charts/pie-chart";
import { useUserStore } from "@/zustand/store";
import Loading from "./loading";
// import { currencies } from "@/constants";
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

  // const currency = currencies.find((cur) => cur.code === data.currency);

  return (
    <main className="w-full h-full">
      <div className="grid grid-cols-6 grid-rows-3 w-full h-full gap-6">
        <div className="p-6">
          <h1 className="h1 text-6xl">Dashboard</h1>
          {/* <p className="text-8xl font-extrabold">{new Date().getDate()}{new Date().getMonth()}</p>
          <p className="text-gray-500 subtitle-1">days to regular payments</p> */}
          <DateComponent />
        </div>

        <div className="col-span-2 p-6 ">
          {/* <p className="h1 text-6xl mb-4">This month</p>
          <p className="h3">Spent $20</p>
          <p className="h3">12 days to regular payments</p> */}
        </div>
        {/* <PieChartComponent /> */}

        <div className="p-6">
          {/* <h2 className="text-lg font-bold text-gray-700">Budget</h2>
          <p className="text-2xl font-semibold text-green-500">
            {currency?.symbol_native}
            {data.savings}
          </p>
          <p className="text-gray-500">Available funds</p> */}
        </div>

        <div className="p-6">
          {/* <h2 className="text-lg font-bold text-gray-700">
            Recent Transactions
          </h2>
          <ul className="text-gray-500">
            <li>💸 Grocery - {currency?.symbol_native}50</li>
            <li>🚗 Transport - {currency?.symbol_native}20</li>
            <li>🍽 Dining - {currency?.symbol_native}30</li>
          </ul> */}
        </div>

        <BarChartComponent />

        {/* <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-700">Quick Actions</h2>
          <Button className="mt-4 w-full">+ Add Expense</Button>
        </div> */}
        <PieChartComponent />

        <LineChartComponent />

        <div className="bg-white shadow-md rounded-xl row-span-2 p-6">
          {/* <h2 className="text-lg font-bold text-gray-700">
            Recurring Payments
          </h2> */}
          <List className="h-full" />
        </div>

        <RadarChartComponent />

        <TooltipChartComponent />

        <div className="bg-white shadow-md rounded-xl p-6 h-full">
          <List className="h-full" />
        </div>

        {/* <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-700">Settings</h2>
          <Button className="mt-4 w-full" variant="secondary">
            ⚙️ Configure
          </Button>
          <Button className="mt-2 w-full">📥 Export Data</Button>
        </div> */}

        <div className="bg-white shadow-md rounded-xl p-6 h-full">
          <List className="h-full" />
        </div>
      </div>
    </main>
  );
};

export default MainPage;
