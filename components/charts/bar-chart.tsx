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
const chartData = [
  { date: "2024-04-01", outgoings: 222, incomes: 150 },
  { date: "2024-04-02", outgoings: 97, incomes: 180 },
  { date: "2024-04-03", outgoings: 167, incomes: 120 },
  { date: "2024-04-04", outgoings: 242, incomes: 260 },
  { date: "2024-04-05", outgoings: 373, incomes: 290 },
  { date: "2024-04-06", outgoings: 301, incomes: 340 },
  { date: "2024-04-07", outgoings: 245, incomes: 180 },
  { date: "2024-04-08", outgoings: 409, incomes: 320 },
  { date: "2024-04-09", outgoings: 59, incomes: 110 },
  { date: "2024-04-10", outgoings: 261, incomes: 190 },
  { date: "2024-04-11", outgoings: 327, incomes: 350 },
  { date: "2024-04-12", outgoings: 292, incomes: 210 },
  { date: "2024-04-13", outgoings: 342, incomes: 380 },
  { date: "2024-04-14", outgoings: 137, incomes: 220 },
  { date: "2024-04-15", outgoings: 120, incomes: 170 },
  { date: "2024-04-16", outgoings: 138, incomes: 190 },
  { date: "2024-04-17", outgoings: 446, incomes: 360 },
  { date: "2024-04-18", outgoings: 364, incomes: 410 },
  { date: "2024-04-19", outgoings: 243, incomes: 180 },
  { date: "2024-04-20", outgoings: 89, incomes: 150 },
  { date: "2024-04-21", outgoings: 137, incomes: 200 },
  { date: "2024-04-22", outgoings: 224, incomes: 170 },
  { date: "2024-04-23", outgoings: 138, incomes: 230 },
  { date: "2024-04-24", outgoings: 387, incomes: 290 },
  { date: "2024-04-25", outgoings: 215, incomes: 250 },
  { date: "2024-04-26", outgoings: 75, incomes: 130 },
  { date: "2024-04-27", outgoings: 383, incomes: 420 },
  { date: "2024-04-28", outgoings: 122, incomes: 180 },
  { date: "2024-04-29", outgoings: 315, incomes: 240 },
  { date: "2024-04-30", outgoings: 454, incomes: 380 },
  { date: "2024-05-01", outgoings: 165, incomes: 220 },
  { date: "2024-05-02", outgoings: 293, incomes: 310 },
  { date: "2024-05-03", outgoings: 247, incomes: 190 },
  { date: "2024-05-04", outgoings: 385, incomes: 420 },
  { date: "2024-05-05", outgoings: 481, incomes: 390 },
  { date: "2024-05-06", outgoings: 498, incomes: 520 },
  { date: "2024-05-07", outgoings: 388, incomes: 300 },
  { date: "2024-05-08", outgoings: 149, incomes: 210 },
  { date: "2024-05-09", outgoings: 227, incomes: 180 },
  { date: "2024-05-10", outgoings: 293, incomes: 330 },
  { date: "2024-05-11", outgoings: 335, incomes: 270 },
  { date: "2024-05-12", outgoings: 197, incomes: 240 },
  { date: "2024-05-13", outgoings: 197, incomes: 160 },
  { date: "2024-05-14", outgoings: 448, incomes: 490 },
  { date: "2024-05-15", outgoings: 473, incomes: 380 },
  { date: "2024-05-16", outgoings: 338, incomes: 400 },
  { date: "2024-05-17", outgoings: 499, incomes: 420 },
  { date: "2024-05-18", outgoings: 315, incomes: 350 },
  { date: "2024-05-19", outgoings: 235, incomes: 180 },
  { date: "2024-05-20", outgoings: 177, incomes: 230 },
  { date: "2024-05-21", outgoings: 82, incomes: 140 },
  { date: "2024-05-22", outgoings: 81, incomes: 120 },
  { date: "2024-05-23", outgoings: 252, incomes: 290 },
  { date: "2024-05-24", outgoings: 294, incomes: 220 },
  { date: "2024-05-25", outgoings: 201, incomes: 250 },
  { date: "2024-05-26", outgoings: 213, incomes: 170 },
  { date: "2024-05-27", outgoings: 420, incomes: 460 },
  { date: "2024-05-28", outgoings: 233, incomes: 190 },
  { date: "2024-05-29", outgoings: 78, incomes: 130 },
  { date: "2024-05-30", outgoings: 340, incomes: 280 },
  { date: "2024-05-31", outgoings: 178, incomes: 230 },
  { date: "2024-06-01", outgoings: 178, incomes: 200 },
  { date: "2024-06-02", outgoings: 470, incomes: 410 },
  { date: "2024-06-03", outgoings: 103, incomes: 160 },
  { date: "2024-06-04", outgoings: 439, incomes: 380 },
  { date: "2024-06-05", outgoings: 88, incomes: 140 },
  { date: "2024-06-06", outgoings: 294, incomes: 250 },
  { date: "2024-06-07", outgoings: 323, incomes: 370 },
  { date: "2024-06-08", outgoings: 385, incomes: 320 },
  { date: "2024-06-09", outgoings: 438, incomes: 480 },
  { date: "2024-06-10", outgoings: 155, incomes: 200 },
  { date: "2024-06-11", outgoings: 92, incomes: 150 },
  { date: "2024-06-12", outgoings: 492, incomes: 420 },
  { date: "2024-06-13", outgoings: 81, incomes: 130 },
  { date: "2024-06-14", outgoings: 426, incomes: 380 },
  { date: "2024-06-15", outgoings: 307, incomes: 350 },
  { date: "2024-06-16", outgoings: 371, incomes: 310 },
  { date: "2024-06-17", outgoings: 475, incomes: 520 },
  { date: "2024-06-18", outgoings: 107, incomes: 170 },
  { date: "2024-06-19", outgoings: 341, incomes: 290 },
  { date: "2024-06-20", outgoings: 408, incomes: 450 },
  { date: "2024-06-21", outgoings: 169, incomes: 210 },
  { date: "2024-06-22", outgoings: 317, incomes: 270 },
  { date: "2024-06-23", outgoings: 480, incomes: 530 },
  { date: "2024-06-24", outgoings: 132, incomes: 180 },
  { date: "2024-06-25", outgoings: 141, incomes: 190 },
  { date: "2024-06-26", outgoings: 434, incomes: 380 },
  { date: "2024-06-27", outgoings: 448, incomes: 490 },
  { date: "2024-06-28", outgoings: 149, incomes: 200 },
  { date: "2024-06-29", outgoings: 103, incomes: 160 },
  { date: "2024-06-30", outgoings: 446, incomes: 400 },
];

const chartConfig = {
  views: {
    label: "Page Views",
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

export function BarChartComponent() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("outgoings");

  const total = React.useMemo(
    () => ({
      outgoings: chartData.reduce((acc, curr) => acc + curr.outgoings, 0),
      incomes: chartData.reduce((acc, curr) => acc + curr.incomes, 0),
    }),
    []
  );

  return (
    <ScrollArea className="bg-white shadow-md rounded-xl col-span-3 p-6">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
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
