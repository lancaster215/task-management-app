import React from 'react';
import { Box, Button, MenuItem, Modal, Select, TextField } from "@mui/material";
import styles from "../styles";
import { formattedDate } from "@/helpers/dateFormatter";
import { Task } from "@/pages";

type AddTaskModalProps = {
    openEditTaskModal: boolean,
    setOpenEditTaskModal: (open: number | null) => void,
    task: Task,
    setTask: React.Dispatch<React.SetStateAction<Task | null>>;
    handleSubmit: (e: React.FormEvent) => void,
}

export default function EditTaskModal({ openEditTaskModal, setOpenEditTaskModal, task, setTask, handleSubmit }: AddTaskModalProps) {
    if (!task) return null;
    const handleOnSubmit = (e: React.FormEvent) => {
        handleSubmit(e);
        setOpenEditTaskModal(null)
    }

    return (
        <Modal
            open={openEditTaskModal}
            onClose={() => setOpenEditTaskModal(null)}
            aria-labelledby="edit-task-modal"
            aria-describedby="editing-task"
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
                    value={task.title}
                    onChange={(e) => setTask({ ...task, title: e.target.value })}
                    fullWidth
                    required
                />
                <TextField
                    label="Describe your task"
                    name="description"
                    value={task.description}
                    onChange={(e) => setTask({ ...task, description: e.target.value })}
                    fullWidth
                    required
                />
                <TextField
                    label="Due date"
                    name="dueDate"
                    value={formattedDate(task.dueDate)}
                    onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                    fullWidth
                    required
                    type="date"
                />
                <Select
                    labelId="role-label"
                    id="role"
                    value={task.priority.toLocaleLowerCase()}
                    label="Select Priority"
                    onChange={(e) => setTask({ ...task, priority: e.target.value })}
                >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                </Select>
                <Select
                    labelId="role-label"
                    id="role"
                    value={task.status.toLocaleLowerCase()}
                    label="Select Status"
                    onChange={(e) => setTask({ ...task, status: e.target.value })}
                >
                    <MenuItem value="todo">Todo</MenuItem>
                    <MenuItem value="in_progress">In-Progress</MenuItem>
                    <MenuItem value="done">Done</MenuItem>
                </Select>
                <Select
                    labelId="role-label"
                    id="tags"
                    value={task.tags.toLocaleLowerCase()}
                    label="Select Tags/Label"
                    onChange={(e) => setTask({ ...task, tags: e.target.value })}
                >
                    <MenuItem value="feature">Feature</MenuItem>
                    <MenuItem value="enhancement">Enhancement</MenuItem>
                    <MenuItem value="bug">Bug</MenuItem>
                </Select>
                <Button type="submit" variant="contained" color="primary">
                    Save Task
                </Button>
            </Box>
        </Modal>
    )
}