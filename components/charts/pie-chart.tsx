"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { category: "Rent", amount: 1200, fill: "var(--color-rent)" },
  { category: "Groceries", amount: 450, fill: "var(--color-groceries)" },
  {
    category: "Entertainment",
    amount: 250,
    fill: "var(--color-entertainment)",
  },
  { category: "Transport", amount: 150, fill: "var(--color-transport)" },
  { category: "Savings", amount: 500, fill: "var(--color-savings)" },
  { category: "Other", amount: 300, fill: "var(--color-other)" },
];

const chartConfig = {
  amount: {
    label: "Amount Spent",
  },
  rent: {
    label: "Rent",
    color: "hsl(var(--chart-1))",
  },
  groceries: {
    label: "Groceries",
    color: "hsl(var(--chart-2))",
  },
  entertainment: {
    label: "Entertainment",
    color: "hsl(var(--chart-3))",
  },
  transport: {
    label: "Transport",
    color: "hsl(var(--chart-4))",
  },
  savings: {
    label: "Savings",
    color: "hsl(var(--chart-5))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig;

export const PieChartComponent = () => {
  const totalAmount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0);
  }, []);

  return (
    <div className="col-span-2 p-6 flex items-center justify-center">
      <div className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="">
          <PieChart className="drop-shadow-md">
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="text-3xl font-bold"
                        >
                          {totalAmount.toLocaleString()}
                        </tspan>
                      </text>
                    );
                  }
                }}
            />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </div>
  );
};
