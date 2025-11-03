import React from 'react';
import { Task } from "@/pages";
import { RootState } from "@/store";
import { BarChart } from "@mui/x-charts/BarChart";
import { useSelector } from "react-redux";

type Props = {
  task: {
    id: number,
    name: string,
    time: string,
    title: string,
    description: string,
    status: string,
    priority: string,
    dueDate: string,
    tags: string,
    createdAt: string,
    action: (string | number),
    assigneeId: string,
  }[],
  windowWidth: number,
}

export default function BarChartPanel({ task: dataTask, windowWidth }: Props) {
    const { assignee } = useSelector((state: RootState) => state.task)
    const data = dataTask.filter((task: Task) => task.assigneeId === assignee.id)
    if(data.length <= 0) {
        return
    }
    // Count priorities
    const priorityCounts: Record<string, number> = data.reduce((acc, task) => {
        const key = task.priority.toUpperCase();
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Prepare data in the same order as the xAxis labels
    const low = priorityCounts["LOW"] || 0;
    const medium = priorityCounts["MEDIUM"] || 0;
    const high = priorityCounts["HIGH"] || 0;

    return (
        <BarChart
            series={[
                { data: [low, 0, 0], label: "Low", color: "#3b82f6" },
                { data: [0, medium, 0], label: "Medium", color: "#fbbf24" },
                { data: [0, 0, high], label: "High", color: "#ef4444" }
            ]}
            xAxis={[{ data: ["Low", "Medium", "High"], scaleType: "band" }]}
            yAxis={[{ width: 50 }]}
            height={300}
            width={windowWidth <= 375 ? 300 : 500}
            sx={{
                "& .MuiChartsLegend-root": {
                    color: 'white',
                },
                "& .MuiChartsAxis-tickLabel": {
                    stroke: "white",
                },
                "& .MuiChartsAxis-line": {
                    stroke: "white",
                },
                "& .MuiChartsAxis-tick": {
                    color: "white",
                },
            }}
        />
    );
}
