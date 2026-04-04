import React from 'react';
import { useTablePanelContext } from "@/components/hooks/useTableContext";
import { Box, Button } from "@mui/material";
import AddNewAssigneeModal from '@/components/modal/AddNewAssigneeModal';

export default function NoAssigneeDisplay() {
    const { openAddNewAccountModal, setOpenAddNewAccountModal, handleAddNewAssigne } = useTablePanelContext();
    return (
        <Box sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', height: '100vh' }}>
            <Box sx={{ textAlign: 'center' }}>
                <AddNewAssigneeModal
                    openAddNewAccountModal={openAddNewAccountModal}
                    setOpenAddNewAccountModal={setOpenAddNewAccountModal}
                    onNoButton={() => setOpenAddNewAccountModal(!openAddNewAccountModal)}
                    handleAddNewAssigne={handleAddNewAssigne}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenAddNewAccountModal(!openAddNewAccountModal)}
                    sx={{
                        fontSize: "clamp(8px, 1.5vw, 15px)",
                    }}
                >
                    Add assignee
                </Button>
            </Box>
        </Box>
    )
}