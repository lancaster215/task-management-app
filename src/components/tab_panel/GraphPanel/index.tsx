import React from 'react';
import { CustomTabPanel } from "@/components";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PieChartPanel from "./PieChart";
import BarChartPanel from "./BarChart";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import TaskCalendar from "./Calendar";
import { Task } from "@/pages/dashboard";
import { a11yProps } from '..';
import { useGetTasks } from '@/components/hooks/api/tasks/useGetTasks';

export default function GraphPanel() {
    const { assignee } = useSelector<RootState, RootState['assignee']>((state) => state.assignee)
    const { data: tasks } = useGetTasks(assignee)

    const finalTask = tasks.filter((task: Task) => task.assigneeId === assignee.id)
    const [value, setValue] = useState(0);
    const [windowWidth, setWindowWidth] = useState<number>(0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const viewportWidth = window.innerWidth;
            setWindowWidth(viewportWidth)
        }
    }, [])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    if (finalTask.length === 0) {
        return (<Typography>There is no chart to render.</Typography>)
    }

    if (!tasks) return;

    return (
        <Box sx={{ justifyContent: 'center', display: 'flex' }}>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', justifyContent: 'center', display: 'flex' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="tabs">
                        <Tab label="Pie Chart" {...a11yProps(0)} sx={{ color: '#0d1117', fontSize: "clamp(10px, 1.5vw, 16px)" }} />
                        <Tab label="Bar Chart" {...a11yProps(1)} sx={{ color: '#0d1117', fontSize: "clamp(10px, 1.5vw, 16px)" }} />
                        <Tab label="Calendar" {...a11yProps(2)} sx={{ color: '#0d1117', fontSize: "clamp(10px, 1.5vw, 16px)" }} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <PieChartPanel />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <BarChartPanel windowWidth={windowWidth} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <TaskCalendar windowWidth={windowWidth} />
                </CustomTabPanel>
            </Box>
        </Box>
    );
}
