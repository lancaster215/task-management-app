import React from 'react';
import AddNewAccountModal from "@/components/modal/addNewAccount";
import { useTablePanelContext } from "@/components/hooks/useTableContext";
import { Box, Button } from "@mui/material";

export default function NoAssigneeDisplay() {
    const { openAddNewAccountModal, setOpenAddNewAccountModal, handleOnSubmit, newUser, setNewUser } = useTablePanelContext();
    return (
        <Box sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', height: '100vh' }}>
            <Box sx={{ textAlign: 'center' }}>
                <AddNewAccountModal
                    openAddNewAccountModal={openAddNewAccountModal}
                    setOpenAddNewAccountModal={setOpenAddNewAccountModal}
                    handleOnSubmit={handleOnSubmit}
                    onNoButton={() => setOpenAddNewAccountModal(!openAddNewAccountModal)}
                    newUser={newUser}
                    setNewUser={setNewUser}
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