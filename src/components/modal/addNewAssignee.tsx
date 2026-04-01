import React from 'react';
import { Box, Button, Modal, TextField } from "@mui/material";
import styles from "../styles";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';

const taskSchema = z.object({
    name: z.string().min(1, "Name is required"),
    id: z.string().uuid().optional(),
});

export type AssigneeFormData = z.infer<typeof taskSchema>;


type AddNewAssigneeModalProps = {
    openAddNewAccountModal: boolean,
    setOpenAddNewAccountModal: (open: boolean) => void,
    onNoButton: (e: React.FormEvent) => void,
    handleAddNewAssigne: (data: AssigneeFormData) => Promise<void>
}

export default function AddNewAssigneeModal({ openAddNewAccountModal, setOpenAddNewAccountModal, handleAddNewAssigne, onNoButton }: AddNewAssigneeModalProps) {
    const { control, handleSubmit, formState: { errors } } = useForm<AssigneeFormData>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            name: '',
        }
    });

    const onSubmit = (data: AssigneeFormData) => {
        const payload = {
            ...data,
            id: crypto.randomUUID(),
        };
        handleAddNewAssigne(payload)
        setOpenAddNewAccountModal(!openAddNewAccountModal)
    };
    return (
        <Modal
            open={openAddNewAccountModal}
            onClose={() => setOpenAddNewAccountModal(!openAddNewAccountModal)}
            aria-labelledby="delete-task-modal"
            aria-describedby="deleting-task"
            sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}
        >
            <Box
                component="form"
                onSubmit={
                    handleSubmit(
                        onSubmit,
                        (err) => console.log('FORM ERRORS', err)
                    )
                }
                sx={styles.formBox}
            >
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Assginee Name"
                            fullWidth
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                    )}
                />
                <Button type="submit" variant="contained" color="primary" sx={{ fontSize: "clamp(10px, 1.5vw, 16px)" }}>Confim</Button>
                <Button variant="outlined" color="error" onClick={onNoButton} sx={{ fontSize: "clamp(10px, 1.5vw, 16px)" }}>Close</Button>
            </Box>
        </Modal>
    )
}