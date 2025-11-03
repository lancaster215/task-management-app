import React from 'react';
import { Box, MenuItem, Select, TextField, Stack } from "@mui/material";

type FilterBarProps = {
    filters: {
        status: string;
        priority: string;
        tags: string;
        startDate: string;
        endDate: string;
    };
    setFilters: React.Dispatch<
        React.SetStateAction<{
        status: string;
        priority: string;
        tags: string;
        startDate: string;
        endDate: string;
        }>
    >;
};

export default function FilterBar({ filters, setFilters }: FilterBarProps) {
  return (
    <Box>
      <Stack direction="row" spacing={2} flexWrap="wrap" gap="20px">
        {/* STATUS FILTER */}
        <Select
            displayEmpty
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            sx={{
                color: 'white',
                border: '1px solid white',
                '& .MuiSvgIcon-root': { color: 'white' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                fontSize: "clamp(10px, 1.5vw, 16px)",
            }}
        >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="todo">Todo</MenuItem>
            <MenuItem value="in_progress">In Progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
        </Select>

        {/* PRIORITY FILTER */}
        <Select
            displayEmpty
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            sx={{
                color: 'white',
                border: '1px solid white',
                '& .MuiSvgIcon-root': { color: 'white' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                fontSize: "clamp(10px, 1.5vw, 16px)"
            }}
        >
            <MenuItem value="">All Priorities</MenuItem>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
        </Select>

        {/* TAG FILTER */}
        <Select
            displayEmpty
            value={filters.tags}
            onChange={(e) => setFilters({ ...filters, tags: e.target.value })}
            sx={{
                color: 'white',
                border: '1px solid white',
                '& .MuiSvgIcon-root': { color: 'white' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                fontSize: "clamp(10px, 1.5vw, 16px)"
            }}
        >
            <MenuItem value="">All Tags</MenuItem>
            <MenuItem value="feature">Feature</MenuItem>
            <MenuItem value="enhancement">Enhancement</MenuItem>
            <MenuItem value="bug">Bug</MenuItem>
        </Select>

        {/* DATE RANGE FILTER */}
        <TextField
            type="date"
            // label="Start Date"
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            sx={{
                color: 'white',
                '& .MuiSvgIcon-root': { color: 'white' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                fontSize: "clamp(10px, 1.5vw, 16px)",
                input: { color: "white" },
                label: { color: "white" },
            }}
        />
        <TextField
            type="date"
            // label="End Date"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            sx={{
                color: 'white',
                '& .MuiSvgIcon-root': { color: 'white' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                fontSize: "clamp(10px, 1.5vw, 16px)",
                input: { color: "white" },
                label: { color: "white" },
            }}
        />
      </Stack>
    </Box>
  );
}
