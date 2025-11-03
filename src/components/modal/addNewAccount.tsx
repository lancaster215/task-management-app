import React from 'react';
import { Box, Button, Modal, TextField } from "@mui/material";
import styles from "../styles";
import { User } from "../Dashboard";

type DeleteTaskModalProps = {
    openAddNewAccountModal: boolean,
    setOpenAddNewAccountModal: (open: boolean) => void,
    onNoButton: (e: React.FormEvent) => void,
    handleOnSubmit: (e: React.FormEvent) => void,
    setNewUser: (e: User) => void,
    newUser: User
}

export default function AddNewAccountModal({ openAddNewAccountModal, setOpenAddNewAccountModal, handleOnSubmit, onNoButton, newUser, setNewUser }: DeleteTaskModalProps) {
    return (
        <Modal
            open={openAddNewAccountModal}
            onClose={() => setOpenAddNewAccountModal(!openAddNewAccountModal)}
            aria-labelledby="delete-task-modal"
            aria-describedby="deleting-task"
            sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center'}}
        >
            <Box
                component="form"
                onSubmit={(e) => handleOnSubmit(e)}
                sx={styles.formBox}
            >
                <TextField
                    label="User name"
                    name="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    fullWidth
                    required
                    sx={{ color: 'black' }}
                />
                <Button type="submit" variant="contained" color="primary" sx={{ fontSize: "clamp(10px, 1.5vw, 16px)" }}>Confim</Button>
                <Button variant="outlined" color="error" onClick={onNoButton} sx={{ fontSize: "clamp(10px, 1.5vw, 16px)" }}>Close</Button>
            </Box>
        </Modal>
    )
}