"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ScrollArea } from "../ui/scroll-area";
import { Transaction } from "@prisma/client";

const chartConfig = {
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function RadarChartComponent({
  transactions,
}: {
  transactions: Transaction[] | undefined;
}) {
  if (!transactions) return null;

  const chartData = Object.values(
    transactions.reduce((acc, transaction) => {
      if (transaction.type !== "expense") return acc;
      const category = transaction.category.toLowerCase();

      if (!acc[category]) {
        acc[category] = { category, expenses: 0 };
      }

      acc[category].expenses += transaction.amount;

      return acc;
    }, {} as Record<string, { category: string; expenses: number }>)
  );

  return (
    <ScrollArea className="bg-white shadow-md rounded-xl p-6">
      <CardHeader className="items-center pb-4">
        <CardTitle>Expenses categories</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarGrid className="fill-[--color-desktop] opacity-20" />
            <PolarAngleAxis dataKey="category" />
            <Radar
              dataKey="expenses"
              fill="var(--color-desktop)"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </ScrollArea>
  );
}
