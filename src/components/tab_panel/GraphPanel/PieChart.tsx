import React from 'react';
import { Task } from "@/pages/dashboard";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { DefaultizedPieValueType, Direction } from "@mui/x-charts";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { theme } from '@/styles/theme';
import { useGetTasks } from '@/hooks/api/tasks/useGetTasks';

export default function PieChartPanel() {
    const isClient = typeof window !== "undefined";
    const userIdFromLocalStorage = isClient && localStorage.getItem('userId');
    const { user } = useSelector<RootState, RootState['user']>((state) => state.user)
    const finalUserId = user.userId || String(userIdFromLocalStorage)
    const { data: tasks, isLoading: isLoadingTasks } = useGetTasks(finalUserId)
    const data = tasks.filter((task: Task) => task.assigneeId === finalUserId)

    if (data.length <= 0) {
        return
    }
    // Group tasks by status and count occurrences. example output { 'todo': 1, 'in_progress': 3, 'done': 4 }
    const statusCounts: Record<string, number> = data.reduce((acc: any, task: Task) => {
        const key = task.status.toUpperCase();
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Convert to PieChart format. output is an array of object [{'todo': 1}, {'in_progress': 2}, {'done': 3}]
    const pieData = Object.entries(statusCounts).map(([status, count]) => ({
        label: status,
        value: count,
    }));

    // Compute total count
    const TOTAL = pieData.reduce((sum, item) => sum + item.value, 0);

    // Function to display percentage labels
    const getArcLabel = (params: DefaultizedPieValueType) => {
        const percent = (params.value / TOTAL) * 100;
        return `${percent.toFixed(0)}%`;
    };

    return (
        <PieChart
            series={[
                {
                    outerRadius: 100,
                    data: pieData,
                    arcLabel: getArcLabel,
                },
            ]}
            sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                    fill: theme.palette.text.primary,
                    fontSize: 14,
                },
                "& .MuiChartsLegend-label": {
                    color: theme.palette.text.primary
                }
            }}
            width={400}
            height={300}
            // style={{ alignItems: 'center', justifyItems: 'center' }}
            // margin={{ right: 100 }}
            slotProps={{
                legend: {
                    direction: "column" as Direction,
                    position: { vertical: "middle", horizontal: "center" },
                },
            }}
        />
    );
}
