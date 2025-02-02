import { PieChartComponent } from "@/components/charts/pie-chart";
import { Button } from "@/components/ui/button";

const MainPage = () => {
  return (
    <main className="w-full h-full">
      <div className="grid grid-cols-6 grid-rows-3 w-full h-full gap-6">
        <div className="p-6">
          <h1 className="h1 text-6xl">Dashboard</h1>
          <p className="text-8xl font-extrabold">20</p>
          <p className="text-gray-500 subtitle-1">days to regular payments</p>
        </div>

        <div className=""></div>

        <PieChartComponent />

        <div className="p-6">
          <h2 className="text-lg font-bold text-gray-700">Budget</h2>
          <p className="text-2xl font-semibold text-green-500">$1,200</p>
          <p className="text-gray-500">Available funds</p>
        </div>

        <div className="p-6">
          <h2 className="text-lg font-bold text-gray-700">
            Recent Transactions
          </h2>
          <ul className="text-gray-500">
            <li>💸 Grocery - $50</li>
            <li>🚗 Transport - $20</li>
            <li>🍽 Dining - $30</li>
          </ul>
        </div>

        <div className="bg-white shadow-md rounded-xl col-span-3 p-6">
          <h2 className="text-lg font-bold text-gray-700">
            Household Expenses & Savings
          </h2>
          <div className="w-full h-40 bg-gray-200 rounded-xl flex items-center justify-center">
            📊 Bar Chart Placeholder
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-700">Quick Actions</h2>
          <Button className="mt-4 w-full">+ Add Expense</Button>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-700">Savings</h2>
          <p className="text-xl font-semibold text-blue-500">$3,500</p>
          <p className="text-gray-500">Total savings</p>
        </div>

        <div className="bg-white shadow-md rounded-xl row-span-2 p-6">
          <h2 className="text-lg font-bold text-gray-700">
            Recurring Payments
          </h2>
          <ul className="text-gray-500">
            <li>🏠 Rent - $800</li>
            <li>💡 Utilities - $100</li>
            <li>📶 Internet - $50</li>
          </ul>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-700">Dream Goal</h2>
          <p className="text-xl font-semibold text-purple-500">$8,000</p>
          <p className="text-gray-500">Trip to Japan</p>
        </div>

        <div className="bg-white shadow-md rounded-xl col-span-2 p-6">
          <h2 className="text-lg font-bold text-gray-700">Budget Summary</h2>
          <p className="text-xl font-semibold text-green-500">$5,000</p>
          <p className="text-gray-500">Total income</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-700">Notifications</h2>
          <ul className="text-gray-500">
            <li>⚠️ Payment due in 3 days</li>
            <li>💰 Savings goal 70% complete</li>
          </ul>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-700">Settings</h2>
          <Button className="mt-4 w-full" variant="secondary">
            ⚙️ Configure
          </Button>
          <Button className="mt-2 w-full">📥 Export Data</Button>
        </div>
      </div>
    </main>
  );
};

export default MainPage;
