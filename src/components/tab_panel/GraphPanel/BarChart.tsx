import React from 'react';
import { Task } from "@/pages/dashboard";
import { RootState } from "@/store";
import { BarChart } from "@mui/x-charts/BarChart";
import { useSelector } from "react-redux";
import { theme } from '@/styles/theme';
import { useGetTasks } from '@/components/hooks/api/tasks/useGetTasks';

type Props = {
    windowWidth: number,
}

export default function BarChartPanel({ windowWidth }: Props) {
    const { assignee } = useSelector<RootState, RootState['assignee']>((state) => state.assignee)
    const { data: task } = useGetTasks(assignee)
    const data = task.filter((task: Task) => task.assigneeId === assignee.id)
    if (data.length <= 0) {
        return
    }
    // Count priorities
    const priorityCounts: Record<string, number> = data.reduce((acc: any, task: Task) => {
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
                { data: [low, 0, 0], label: "Low", color: theme.palette.background.blue },
                { data: [0, medium, 0], label: "Medium", color: theme.palette.primary.main },
                { data: [0, 0, high], label: "High", color: theme.palette.background.red }
            ]}
            xAxis={[{ data: ["Low", "Medium", "High"], scaleType: "band" }]}
            yAxis={[{ width: 50 }]}
            height={300}
            width={windowWidth <= 375 ? 300 : 500}
            sx={{
                "& .MuiChartsLegend-root": {
                    color: '#0d1117',
                },
                "& .MuiChartsAxis-tickLabel": {
                    stroke: "#0d1117",
                },
                "& .MuiChartsAxis-line": {
                    stroke: "#0d1117",
                },
                "& .MuiChartsAxis-tick": {
                    color: "#0d1117",
                },
            }}
        />
    );
}
