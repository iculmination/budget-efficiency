"use client";

import { Bar, BarChart, XAxis } from "recharts";

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ScrollArea } from "../ui/scroll-area";
import { FullUser } from "@/types";
// const chartData = [
//   { date: "2024-07-15", expenses: 450, left: 300 },
//   { date: "2024-07-16", expenses: 380, left: 420 },
//   { date: "2024-07-17", expenses: 520, left: 120 },
//   { date: "2024-07-18", expenses: 140, left: 550 },
//   { date: "2024-07-19", expenses: 600, left: 350 },
//   { date: "2024-07-20", expenses: 480, left: 400 },
// ];

const chartConfig = {
  expenses: {
    label: "Spent",
    color: "hsl(var(--chart-1))",
  },
  left: {
    label: "Saved",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function TooltipChartComponent({
  data,
  currency,
}: {
  data: FullUser;
  currency: string;
}) {
  const goal = (data.income / 100) * data.percentageGoal!;

  const chartData = Object.values(
    data.transactions!.reduce((acc, transaction) => {
      const date = new Date(transaction.date);
      const month = date.toLocaleString("en-US", { month: "long" });

      if (!acc[month]) {
        acc[month] = {
          date: month,
          expenses: 0,
          left: data.income - transaction.amount,
        };
      }

      if (transaction.type === "expense") {
        acc[month].expenses += transaction.amount;
        acc[month].left -= transaction.amount;
      } else {
        acc[month].left += transaction.amount;
      }
      return acc;
    }, {} as Record<string, { date: string; expenses: number; left: number }>)
  );

  return (
    <ScrollArea className="bg-white shadow-md rounded-xl col-span-2 p-6">
      <CardHeader>
        <CardTitle>Spent/Saved</CardTitle>
        <CardDescription>
          Your goal is to save{" "}
          <span className="font-bold">
            {currency}
            {goal.toFixed()}
          </span>{" "}
          every month.
        </CardDescription>
      </CardHeader>
      <div>
        <ChartContainer config={chartConfig} className="w-full max-h-60">
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.substring(0, 3)}
            />
            <Bar
              dataKey="expenses"
              stackId="a"
              fill="var(--color-expenses)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="left"
              stackId="a"
              fill="var(--color-left)"
              radius={[4, 4, 0, 0]}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              cursor={false}
              defaultIndex={1}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </ScrollArea>
  );
}
