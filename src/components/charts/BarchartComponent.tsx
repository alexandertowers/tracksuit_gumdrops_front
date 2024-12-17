"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "../ui/chart"

type ChartData = [string, number][]

interface BarchartProps {
  data: ChartData
}

export function BarchartComponent({ data }: BarchartProps) {
  const baseColors = [
    "#8979bf",
  ]

  const termEntries = data.map(([term], index) => {
    const color = baseColors[index % baseColors.length]
    return [term, { label: term, color }]
  })

  const chartConfig = {
    importance_score: { label: "Importance Score" },
    ...Object.fromEntries(termEntries),
  } satisfies ChartConfig

  const chartData = data.map(([term, score]) => ({
    topic: term,
    importance_score: score,
    fill: chartConfig[term]?.color ?? "#000"
  }))

  return (
        <ChartContainer config={chartConfig} className="p-5 w-full h-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ left: 0 }}
          >
            <YAxis
              dataKey="topic"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: string) =>
                chartConfig[value]?.label ?? value
              }
              width={150}
            />
            <XAxis dataKey="importance_score" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="importance_score" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
  )
}
