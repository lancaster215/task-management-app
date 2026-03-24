import React from 'react';
import { Box, Button, Modal, Typography } from "@mui/material";
import styles from "../styles";
import { useTablePanelContext } from '../hooks/useTableContext';

export default function DeleteTaskModal() {
    const { openDeleteModal, setOpenDeleteModal, handleDelete } = useTablePanelContext();

    return (
        <Modal
            open={openDeleteModal}
            onClose={() => setOpenDeleteModal(!openDeleteModal)}
            aria-labelledby="delete-task-modal"
            aria-describedby="deleting-task"
            sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}
        >
            <Box
                sx={styles.formBox}
            >
                <Typography sx={{ color: 'black', fontSize: "clamp(10px, 1.5vw, 16px)" }}>Are you sure you want to delete this task?</Typography>
                <Button variant="contained" color="primary" onClick={handleDelete} sx={{ fontSize: "clamp(10px, 1.5vw, 16px)" }}>Yes</Button>
                <Button variant="outlined" color="error" onClick={() => setOpenDeleteModal(!openDeleteModal)} sx={{ fontSize: "clamp(10px, 1.5vw, 16px)" }}>No</Button>
            </Box>
        </Modal>
    )
}