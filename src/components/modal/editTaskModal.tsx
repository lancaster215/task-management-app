import React from 'react';
import { Box, Button, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import styles from "../styles";
import { useTablePanelContext } from '../hooks/useTableContext';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TaskFormData } from './addTaskModal';

const taskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    dueDate: z.string().min(1, "Date is required"),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
    status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
    tags: z.enum(["FEATURE", "BUG", "ENHANCEMENT"])
});


export default function EditTaskModal() {
    const { editingId, setEditingId, setOpenAddTaskModal, handleSaveEdit } = useTablePanelContext();

    const { control, handleSubmit, formState: { errors } } = useForm<TaskFormData>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: '',
            description: '',
            dueDate: '',
            priority: 'LOW',
            status: 'TODO',
            tags: 'FEATURE'
        }
    });
    const onSubmit = (data: TaskFormData) => {
        console.log('onSubmit', data)
        handleSaveEdit(data)
        setOpenAddTaskModal(false);
    };

    return (
        <Modal
            open={editingId !== null}
            onClose={() => setEditingId(null)}
            aria-labelledby="edit-task-modal"
            aria-describedby="editing-task"
            sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}
        >
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={styles.formBox}>
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Task title"
                            fullWidth
                            error={!!errors.title}
                            helperText={errors.title?.message}
                        />
                    )}
                />

                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Describe your task"
                            fullWidth
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />
                    )}
                />

                <InputLabel id="due-date" sx={{ color: "#000000de" }}>
                    Due Date
                </InputLabel>
                <Controller
                    name="dueDate"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            type="date"
                            fullWidth
                        // InputProps={{
                        //     endAdornment: (
                        //         <InputAdornment position="end">
                        //             <CalendarTodayIcon />
                        //         </InputAdornment>
                        //     ),
                        // }}
                        />
                    )}
                />
                <InputLabel>Priority</InputLabel>
                <Controller
                    name="priority"
                    control={control}
                    render={({ field }) => (
                        <Select {...field} fullWidth>
                            <MenuItem value="LOW">Low</MenuItem>
                            <MenuItem value="MEDIUM">Medium</MenuItem>
                            <MenuItem value="HIGH">High</MenuItem>
                        </Select>
                    )}
                />
                <InputLabel id="status-label" sx={{ color: "#000000de" }}>
                    Select Status
                </InputLabel>
                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                        <Select {...field} fullWidth>
                            <MenuItem value="TODO">Todo</MenuItem>
                            <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                            <MenuItem value="DONE">Done</MenuItem>
                        </Select>
                    )}
                />
                <InputLabel id="tags-label" sx={{ color: "#000000de" }}>
                    Select Tags
                </InputLabel>
                <Controller
                    name="tags"
                    control={control}
                    render={({ field }) => (
                        <Select {...field} fullWidth>
                            <MenuItem value="FEATURE">Feature</MenuItem>
                            <MenuItem value="BUG">Bug</MenuItem>
                            <MenuItem value="ENHANCEMENT">Enhancement</MenuItem>
                        </Select>
                    )}
                />

                <Button type="submit" variant="contained">Add New Task</Button>
            </Box>
        </Modal>
    )
}