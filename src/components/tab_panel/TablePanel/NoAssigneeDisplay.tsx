import React from 'react';
import AddNewAccountModal from "@/components/modal/addNewAssignee";
import { useTablePanelContext } from "@/components/hooks/useTableContext";
import { Box, Button } from "@mui/material";

export default function NoAssigneeDisplay() {
    const { openAddNewAccountModal, setOpenAddNewAccountModal, handleOnSubmit } = useTablePanelContext();
    return (
        <Box sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', height: '100vh' }}>
            <Box sx={{ textAlign: 'center' }}>
                <AddNewAccountModal
                    openAddNewAccountModal={openAddNewAccountModal}
                    setOpenAddNewAccountModal={setOpenAddNewAccountModal}
                    onNoButton={() => setOpenAddNewAccountModal(!openAddNewAccountModal)}
                    handleOnSubmit={handleOnSubmit}
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