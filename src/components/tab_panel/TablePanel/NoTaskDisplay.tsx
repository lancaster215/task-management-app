import React from 'react';
import AddTaskModal from "@/components/modal/addTaskModal";
import { useTablePanelContext } from "@/components/hooks/useTableContext";
import { Box, Button, Typography } from "@mui/material";

export default function NoTaskDisplay() {
    const { openAddTaskModal, setOpenAddTaskModal, assigneeFromRedux } = useTablePanelContext();
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
                <Typography>No Task/s for {assigneeFromRedux.name}</Typography>
            </Box>
        </Box>
    )
}