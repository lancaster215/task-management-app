import { Task } from "@/pages/dashboard";
import { Autocomplete, Box, Button, Checkbox, Paper, Stack, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, TextField } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import AddTaskModal from "../../modal/AddTaskModal";
import EnhancedTableHead from "../../custom_components/EnhancedTableHead";
import EditTaskModal from "@/components/modal/EditTaskModal";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteTaskModal from "@/components/modal/DeleteTaskModal";
import { formattedDate } from "@/helpers/dateFormatter";
import normalizeText from "@/helpers/noramlizeText";
import { useStatusColor } from "../../hooks/useStatusColor";
import { usePriorityColor } from "../../hooks/usePriorityColor";
import { useTagsColor } from "../../hooks/useTagsColor";
import { useTablePanelContext } from "@/components/hooks/useTableContext";
import NoAssigneeDisplay from "./NoAssigneeDisplay";
import NoTaskDisplay from "./NoTaskDisplay";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Loading from "@/components/loading";
import { useGetTasks } from "@/components/hooks/api/tasks/useGetTasks";
import EditIcon from '@mui/icons-material/Edit';

export default function TablePanel() {
    const {
        setOpenAddTaskModal,
        openAddTaskModal,
        setSelected,
        selected,
        handleSelectAllClick,
        order,
        handleRequestSort,
        orderBy,
        handleChangeRowsPerPage,
        rowsPerPage,
        page,
        handleChangePage,
        setSearchText,
        searchText,
        setSearchTextArr,
        searchTextArr,
        setOpenDeleteModal,
        openDeleteModal,
        handleEdit,
        filteredTasks,
        addTaskPending
    } = useTablePanelContext();
    const { assignee } = useSelector<RootState, RootState['assignee']>((state) => state.assignee);
    const { data: tasks, isLoading: isLoadingTasks } = useGetTasks(assignee)

    useEffect(() => {
        if (!searchText.trim()) return;

        const delayDebounce = setTimeout(() => {
            setSearchTextArr((prev: string[]) => {
                const updated = [searchText, ...prev.filter(item => item !== searchText)];
                return updated.slice(0, 5);
            });
        }, 1000); // 1 second after typing stops, trigger function

        return () => clearTimeout(delayDebounce);
    }, [searchText]);

    const filterByAssigneeId = useMemo(() =>
        filteredTasks.filter((filteredTask: Task) => filteredTask.assigneeId === assignee.id)
        , [filteredTasks, assignee])

    const handleClick = (id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleAutocompleteInputChange = (event: React.SyntheticEvent, value: string) => {
        setSearchText(value);
    }

    if (isLoadingTasks || addTaskPending) {
        return <Loading />
    } else {
        // No assignee
        if (assignee.name === '') return <NoAssigneeDisplay />

        // No Task for selected assignee
        if (tasks.length === 0 && assignee.name !== '') return <NoTaskDisplay />

        return (
            <>
                <AddTaskModal />
                <EditTaskModal />
                <DeleteTaskModal />

                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ width: '100%' }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setOpenAddTaskModal(!openAddTaskModal)}
                        sx={{
                            fontSize: "clamp(8px, 1.5vw, 15px)",
                            minWidth: 'fit-content'
                        }}
                    >
                        +
                    </Button>
                    <Autocomplete
                        value={searchText}
                        onInputChange={handleAutocompleteInputChange}
                        disableClearable
                        options={searchTextArr}
                        sx={{
                            fontSize: "clamp(8px, 1.5vw, 16px)",
                            flexGrow: 1,
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search by title or description"
                                slotProps={{
                                    input: {
                                        ...params.InputProps,
                                        type: 'search',
                                    },
                                }}
                                sx={{
                                    input: {
                                        color: 'black',
                                        '&::placeholder': {
                                            color: 'black',
                                            opacity: 0.8,
                                            fontSize: "clamp(8px, 1.5vw, 16px)"
                                        },
                                    },
                                    label: { color: 'black' },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'black',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#90caf9',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#42a5f5',
                                        },
                                    },
                                }}
                            />
                        )}
                    />
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => setOpenDeleteModal(!openDeleteModal)}
                        disabled={selected.length === 0}
                        sx={{ minWidth: 'fit-content' }}
                    >
                        <DeleteIcon sx={{ width: 'clamp(15px, 1.5vw, 16px)' }} />
                    </Button>
                </Stack>
                <Paper sx={{ marginTop: 2, padding: 2 }}>
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={'small'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={5}
                                header='task'
                            />
                            <TableBody>
                                {filterByAssigneeId.map((task) => {
                                    const isItemSelected = task.id ? selected.includes(task.id) : false
                                    return (
                                        <TableRow
                                            hover
                                            onClick={() => task.id && handleClick(task.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={task.id}
                                            selected={isItemSelected}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                // inputProps={{
                                                // 'aria-labelledby': labelId,
                                                // }}
                                                />
                                            </TableCell>
                                            {[
                                                {
                                                    text: task.title,
                                                    color: 'black',
                                                },
                                                {
                                                    text: task.description,
                                                    color: 'black',
                                                },
                                                {
                                                    text: task.status,
                                                    color: useStatusColor(task.status),
                                                    withBg: true,
                                                },
                                                {
                                                    text: task.priority,
                                                    color: usePriorityColor(task.priority),
                                                    withBg: true,
                                                },
                                                {
                                                    text: task.tags,
                                                    color: useTagsColor(task.tags),
                                                    withBg: true,
                                                },
                                                {
                                                    text: formattedDate(task.dueDate),
                                                    color: 'black'
                                                },
                                                // {
                                                //     text: formattedDate(task.createdAt),
                                                //     color: 'black'
                                                // }
                                            ].map((text, id) =>
                                                <TableCell key={id} align={text.withBg ? "center" : "left"}>
                                                    <Box
                                                        sx={[
                                                            {
                                                                fontSize: "clamp(10px, 1.5vw, 16px)",
                                                                textOverflow: 'ellipsis',
                                                                whiteSpace: "nowrap",
                                                                overflow: "hidden",
                                                                maxWidth: "150px",
                                                            },
                                                            text.withBg ? {
                                                                backgroundColor: text.color,
                                                                height: 'auto',
                                                                width: 'auto',
                                                                padding: '10px',
                                                                borderRadius: '5px',
                                                                color: 'white',
                                                            } : {}
                                                        ]}
                                                    >
                                                        {normalizeText(text.text)}
                                                    </Box>
                                                </TableCell>
                                            )}
                                            <TableCell align="left">
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => task.id && handleEdit(task.id)}
                                                    sx={{ fontSize: "clamp(10px, 1.5vw, 16px)" }}
                                                >
                                                    <EditIcon />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredTasks.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </>
        )
    }
}