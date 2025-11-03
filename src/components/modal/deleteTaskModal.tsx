import React from 'react';
import { Box, Button, Modal, Typography } from "@mui/material";
import styles from "../styles";

type DeleteTaskModalProps = {
    openDeleteTaskModal: boolean,
    setOpenDeleteTaskModal: (open: boolean) => void,
    onYesButton: (e: React.FormEvent) => void,
    onNoButton: (e: React.FormEvent) => void,
}

export default function DeleteTaskModal({ openDeleteTaskModal, setOpenDeleteTaskModal, onYesButton, onNoButton }: DeleteTaskModalProps) {
    return (
        <Modal
            open={openDeleteTaskModal}
            onClose={() => setOpenDeleteTaskModal(!openDeleteTaskModal)}
            aria-labelledby="delete-task-modal"
            aria-describedby="deleting-task"
            sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center'}}
        >
            <Box
                sx={styles.formBox}
            >
                <Typography sx={{color: 'black', fontSize: "clamp(10px, 1.5vw, 16px)"}}>Are you sure you want to delete this task?</Typography>
                <Button variant="contained" color="primary" onClick={onYesButton} sx={{ fontSize: "clamp(10px, 1.5vw, 16px)" }}>Yes</Button>
                <Button variant="outlined" color="error" onClick={onNoButton} sx={{ fontSize: "clamp(10px, 1.5vw, 16px)" }}>No</Button>
            </Box>
        </Modal>
    )
}