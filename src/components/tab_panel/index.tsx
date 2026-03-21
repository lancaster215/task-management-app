import React from 'react';
import { Box, Tab, Tabs } from "@mui/material";
import { CustomTabPanel } from "..";
import TablePanel from "./TablePanel";
import GraphPanel from "./graphs";
import { useState } from "react";
import { DashboardProps } from "@/pages/dashboard";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

interface TabPanleInterface extends DashboardProps {
	sidebarWidth: number,
	openSidebar: boolean,
}

function TabPanel({ task, assignee: preRenderedAssignee, sidebarWidth, openSidebar }: TabPanleInterface) {
	const { assignee } = useSelector<RootState, RootState['task']>((state) => state.task);
	const [value, setValue] = useState<number>(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Box
			component="main"
			sx={{
				flexGrow: 1,
				marginLeft: openSidebar ? `${sidebarWidth}px` : '70px',
				width: {
					xs: '100%',
					sm: openSidebar ? `calc(100% - ${sidebarWidth}px)` : 'calc(100% - 70px)'
				},
				p: 3,
				transition: 'margin 0.3s ease',
				backgroundColor: 'palette.background.paper'
			}}
		>
			<Box
				sx={{
					borderBottom: 1,
					borderColor: 'divider',
					justifyContent: 'center',
					display: 'flex',
					backgroundColor: 'black'
				}}>
				<Tabs value={value} onChange={handleChange} aria-label="tabs">
					<Tab label="Table" {...a11yProps(0)} sx={{ color: 'white' }} />
					<Tab label="Kanban" {...a11yProps(1)} sx={{ color: 'white' }} />
					<Tab label="Graphs" {...a11yProps(2)} sx={{ color: 'white' }} />
				</Tabs>
			</Box>
			<CustomTabPanel value={value} index={0}>
				<TablePanel task={task} assignee={preRenderedAssignee ?? assignee} />
			</CustomTabPanel>
			<CustomTabPanel value={value} index={1}>
				Item Two
			</CustomTabPanel>
			<CustomTabPanel value={value} index={2}>
				<GraphPanel />
			</CustomTabPanel>
		</Box>
	)
}

export default TabPanel