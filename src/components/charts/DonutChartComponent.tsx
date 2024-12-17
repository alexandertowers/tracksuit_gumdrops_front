"use client"

import { Pie, PieChart, Cell } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "../ui/chart"

interface SentimentData {
  key: "positive" | "neutral" | "negative"
  value: number
}

interface DonutChartProps {
  data: SentimentData[]
}

const sentimentColors = {
  positive: "#2c7873", 
  neutral: "#ffffff",
  negative: "#e95151",
}

// Build a ChartConfig dynamically if needed
const chartConfig = {
  value: {
    label: "Proportion",
  },
  positive: {
    label: "Positive",
    color: sentimentColors.positive,
  },
  neutral: {
    label: "Neutral",
    color: sentimentColors.neutral,
  },
  negative: {
    label: "Negative",
    color: sentimentColors.negative,
  },
} satisfies ChartConfig

export function DonutchartComponent({ data }: DonutChartProps) {
  // Transform data into recharts-friendly format
  const chartData = data.map(item => ({
    sentiment: item.key,
    value: item.value,
    fill: chartConfig[item.key].color,
  }))

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="sentiment"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}
