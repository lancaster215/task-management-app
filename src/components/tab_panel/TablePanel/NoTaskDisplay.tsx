import React from 'react';
import AddTaskModal from "@/components/modal/addTaskModal";
import { useTablePanelContext } from "@/components/hooks/useTableContext";
import { Box, Button, Typography } from "@mui/material";
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function NoTaskDisplay() {
    const { openAddTaskModal, setOpenAddTaskModal } = useTablePanelContext();
    const { assignee } = useSelector<RootState, RootState['task']>((state) => state.task);
    return (
        <Box sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', height: '100vh' }}>
            <Box sx={{ textAlign: 'center' }}>
                <AddTaskModal />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenAddTaskModal(!openAddTaskModal)}
                    sx={{
                        fontSize: "clamp(8px, 1.5vw, 15px)",
                        width: '110px'
                    }}
                >
                    Add Task
                </Button>
                <Typography>No Task/s for {assignee.name}</Typography>
            </Box>
        </Box>
    )
}