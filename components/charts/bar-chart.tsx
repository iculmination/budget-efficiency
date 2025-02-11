"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ScrollArea } from "../ui/scroll-area";
import { FullUser } from "@/types";

const chartConfig = {
  date: {
    label: "Date",
  },
  outgoings: {
    label: "Outgoings",
    color: "hsl(var(--chart-1))",
  },
  incomes: {
    label: "Incomes",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function BarChartComponent({
  data,
  currency,
}: {
  data: FullUser;
  currency: string;
}) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("outgoings");

  const dataMap: Record<
    string,
    { date: string; outgoings: number; incomes: number }
  > = {};

  data.transactions
    ?.filter((t) => t.type === "expense")
    .forEach(({ amount, date }) => {
      if (!dataMap[date]) {
        dataMap[date] = { date, outgoings: 0, incomes: 0 };
      }
      dataMap[date].outgoings += amount;
    });

  data.transactions
    ?.filter((t) => t.type === "income")
    .forEach(({ amount, date }) => {
      if (!dataMap[date]) {
        dataMap[date] = { date, outgoings: 0, incomes: 0 };
      }
      dataMap[date].incomes += amount;
    });

  const chartData = Object.values(dataMap);

  const total = React.useMemo(
    () => ({
      outgoings: chartData
        .reduce((acc, curr) => acc + curr.outgoings, 0)
        .toFixed(2),
      incomes: chartData
        .reduce((acc, curr) => acc + curr.incomes, 0)
        .toFixed(2),
    }),
    [chartData]
  );

  return (
    <ScrollArea className="bg-white shadow-md rounded-xl col-span-3 p-6">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Incomes/Expenses</CardTitle>
          <CardDescription>
            Showing your incomes and expenses for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["outgoings", "incomes"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {currency}
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <div className="">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </div>
    </ScrollArea>
  );
}
