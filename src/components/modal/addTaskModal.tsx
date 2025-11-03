import React from 'react';
import { Box, Button, IconButton, InputAdornment, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import styles from "../styles";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useRef } from "react";

type AddTaskModalProps = {
    openAddTaskModal: boolean,
    setOpenAddTaskModal: (open: boolean) => void,
    newTask: {
        title: string,
        description: string,
        status: string,
        priority: string,
        dueDate: string,
        tags: string,
    },
    setNewTask: (task: {
        title: string,
        description: string,
        status: string,
        priority: string,
        dueDate: string,
        tags: string,
    }) => void,
    handleSubmit: (e: React.FormEvent) => void,
}

export default function AddTaskModal({ openAddTaskModal, setOpenAddTaskModal, newTask, setNewTask, handleSubmit }: AddTaskModalProps) {
    const dateInputRef = useRef<HTMLInputElement | null>(null);

    const handleIconClick = () => {
        if (dateInputRef.current) {
        dateInputRef.current.showPicker?.(); // ✅ Triggers the browser date picker
        dateInputRef.current.focus(); // fallback for browsers that don't support showPicker
        }
    };
    const handleOnSubmit = (e: React.FormEvent) => {
        handleSubmit(e);
        setOpenAddTaskModal(!openAddTaskModal)
    }
    return (
        <Modal
            open={openAddTaskModal}
            onClose={() => setOpenAddTaskModal(!openAddTaskModal)}
            aria-labelledby="add-task-modal"
            aria-describedby="adding-task"
            sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center'}}
        >
            <Box
                component="form"
                onSubmit={(e) => handleOnSubmit(e)}
                sx={styles.formBox}
            >
                <TextField
                    label="Task title"
                    name="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    fullWidth
                    required
                />
                <TextField
                    label="Describe your task"
                    name="description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    fullWidth
                    required
                />
                <InputLabel id="due-date" sx={{ color: "#000000de" }}>
                    Due Date
                </InputLabel>
                <TextField
                    name="dueDate"
                    // label="Due Date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    fullWidth
                    required
                    type="date"
                    inputRef={dateInputRef}
                    // InputLabelProps={{
                    //     shrink: true, // keeps the label visible when a date is selected
                    // }}
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleIconClick}>
                                <CalendarTodayIcon sx={{ color: "#000000de" }} />
                            </IconButton>
                        </InputAdornment>
                        ),
                    }}
                    sx={{
                        input: { color: "#000000de" },
                        label: { color: "#000000de" },
                    }}
                />
                <InputLabel id="priority-label" sx={{ color: "#000000de" }}>
                    Select Priority
                </InputLabel>
                <Select
                    labelId="priority-label"
                    id="priority"
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    label="Select Priority"
                >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                </Select>
                <InputLabel id="status-label" sx={{ color: "#000000de" }}>
                    Select Status
                </InputLabel>
                <Select
                    labelId="status-label"
                    id="status"
                    value={newTask.status}
                    label="Select Status"
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                >
                    <MenuItem value="todo">Todo</MenuItem>
                    <MenuItem value="in_progress">In-Progress</MenuItem>
                    <MenuItem value="done">Done</MenuItem>
                </Select>
                <InputLabel id="tags-label" sx={{ color: "#000000de" }}>
                    Select Tags
                </InputLabel>
                <Select
                    labelId="tags-label"
                    id="tags"
                    value={newTask.tags}
                    label="Select Tags/Label"
                    onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
                >
                    <MenuItem value="feature">Feature</MenuItem>
                    <MenuItem value="enhancement">Enhancement</MenuItem>
                    <MenuItem value="bug">Bug</MenuItem>
                </Select>
                <Button type="submit" variant="contained" color="primary">
                    Add New Task
                </Button>
            </Box>
        </Modal>
    )
}