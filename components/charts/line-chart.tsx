"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ScrollArea } from "../ui/scroll-area";
const chartData = [
  { month: "January", budget: 1186 },
  { month: "February", budget: 1305 },
  { month: "March", budget: 1237 },
  { month: "April", budget: 473 },
  { month: "May", budget: 1209 },
  { month: "June", budget: 1214 },
];

const chartConfig = {
  budget: {
    label: "Budget",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function LineChartComponent() {
  return (
    <ScrollArea className="bg-white shadow-md rounded-xl p-6">
      <CardHeader>
        <CardTitle>Your savings</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <div>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="budget"
              type="natural"
              stroke="blue"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </ScrollArea>
  );
}
