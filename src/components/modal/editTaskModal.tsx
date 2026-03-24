import React from 'react';
import { Box, Button, MenuItem, Modal, Select, TextField } from "@mui/material";
import styles from "../styles";
import { formattedDate } from "@/helpers/dateFormatter";
import { useTablePanelContext } from '../hooks/useTableContext';

export default function EditTaskModal() {
    const { editingTask, handleSubmit, editingId, setEditingId, setEditingTask } = useTablePanelContext();
    if (!editingTask) return null;
    const handleOnSubmit = (e: React.FormEvent) => {
        handleSubmit(e);
        setEditingId(null)
    }

    return (
        <Modal
            open={editingId !== null}
            onClose={() => setEditingId(null)}
            aria-labelledby="edit-task-modal"
            aria-describedby="editing-task"
            sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}
        >
            <Box
                component="form"
                onSubmit={(e) => handleOnSubmit(e)}
                sx={styles.formBox}
            >
                <TextField
                    label="Task title"
                    name="title"
                    value={editingTask.title}
                    onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                    fullWidth
                    required
                />
                <TextField
                    label="Describe your task"
                    name="description"
                    value={editingTask.description}
                    onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                    fullWidth
                    required
                />
                <TextField
                    label="Due date"
                    name="dueDate"
                    value={formattedDate(editingTask.dueDate)}
                    onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                    fullWidth
                    required
                    type="date"
                />
                <Select
                    labelId="role-label"
                    id="role"
                    value={editingTask.priority.toLocaleLowerCase()}
                    label="Select Priority"
                    onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}
                >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                </Select>
                <Select
                    labelId="role-label"
                    id="role"
                    value={editingTask.status.toLocaleLowerCase()}
                    label="Select Status"
                    onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
                >
                    <MenuItem value="todo">Todo</MenuItem>
                    <MenuItem value="in_progress">In-Progress</MenuItem>
                    <MenuItem value="done">Done</MenuItem>
                </Select>
                <Select
                    labelId="role-label"
                    id="tags"
                    value={editingTask.tags.toLocaleLowerCase()}
                    label="Select Tags/Label"
                    onChange={(e) => setEditingTask({ ...editingTask, tags: e.target.value })}
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