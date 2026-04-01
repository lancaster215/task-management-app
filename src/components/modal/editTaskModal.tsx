import React, { useEffect } from 'react';
import { Box, Button, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import styles from "../styles";
import { useTablePanelContext } from '../hooks/useTableContext';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TaskFormData, taskSchema } from './addTaskModal';
import { formattedDate } from '@/helpers/dateFormatter';

export default function EditTaskModal() {
    const { taskToEdit, setTaskToEdit, setOpenAddTaskModal, handleSaveEdit } = useTablePanelContext();

    const { control, reset, handleSubmit, formState: { errors } } = useForm<TaskFormData>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            id: null,
            title: '',
            description: '',
            dueDate: '',
            priority: 'LOW',
            status: 'TODO',
            tags: 'FEATURE'
        },
    });

    useEffect(() => {
        if (taskToEdit) {
            reset({
                id: taskToEdit.id,
                title: taskToEdit.title,
                description: taskToEdit.description,
                dueDate: formattedDate(taskToEdit.dueDate),
                priority: taskToEdit.priority,
                status: taskToEdit.status,
                tags: taskToEdit.tags,
            });
        }
    }, [taskToEdit, reset]);

    const onSubmit = (data: TaskFormData) => {
        handleSaveEdit(data)
        setOpenAddTaskModal(false);
    };

    return (
        <Modal
            open={taskToEdit !== null}
            onClose={() => setTaskToEdit(null)}
            aria-labelledby="edit-task-modal"
            aria-describedby="editing-task"
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
                        <Select
                            {...field}
                            fullWidth
                        >
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
                        <Select
                            {...field}
                            fullWidth
                        >
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
                        <Select
                            {...field}
                            fullWidth
                        >
                            <MenuItem value="FEATURE">Feature</MenuItem>
                            <MenuItem value="BUG">Bug</MenuItem>
                            <MenuItem value="ENHANCEMENT">Enhancement</MenuItem>
                        </Select>
                    )}
                />

                <Button type="submit" variant="contained">Save Changes</Button>
            </Box>
        </Modal>
    )
}