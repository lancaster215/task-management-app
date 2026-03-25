import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Typography } from "@mui/material"
import React, { useState } from "react";
import { Data, Order } from '@/types/tableTypes';
import EnhancedTableHead from "../custom_components/EnhancedTableHead";
import { useDispatch, useSelector } from "react-redux";
import { setAssignee } from "@/store/taskSlice";
import { Assignee } from "@/pages/dashboard";
import { RootState } from "@/store";
import DeleteIcon from '@mui/icons-material/Delete';
import { User } from "..";

interface AssigneeTableProps {
    openAddNewAssignee: boolean,
    setOpenAddNewAssignee: (value: boolean) => void,
    handleDelete: (selected: string) => void,
}

export default function AssigneeTable(props: AssigneeTableProps) {
    const dispatch = useDispatch();
    const { assignee, assignees } = useSelector<RootState, RootState['task']>((state) => state.task);

    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Data | 'action'>('status');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [assigneeId, setAssigneeId] = useState<string>(assignee.id);


    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data | 'action',
    ) => {
        const noSortHeaders = ['title', 'description', 'tags', 'dueDate']
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');

        if (!noSortHeaders.includes(property)) {
            setOrderBy(property);
        }
    };

    const handleClick = (name: string, id: string) => {
        dispatch(setAssignee({ name, id }))
        setAssigneeId(id)
        props.setOpenAddNewAssignee(!props.openAddNewAssignee);
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    return (
        <Modal
            open={props.openAddNewAssignee}
            onClose={() => props.setOpenAddNewAssignee(!props.openAddNewAssignee)}
            aria-labelledby="delete-task-modal"
            aria-describedby="deleting-task"
            sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}
        >
            <Box sx={{ mx: '100px', mt: '10px', maxWidth: '50%' }}>
                <Paper sx={{ marginTop: '10px', padding: 2, maxWidth: '100%' }}>
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={'small'}
                        >
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={5}
                                header="user"
                            />
                            {/* <Divider sx={{mt: 1}} /> */}
                            <TableBody>
                                {assignees.map((assignee: User, id) => {
                                    return (
                                        <TableRow
                                            hover
                                            onClick={() => handleClick(assignee.name, assignee.id)}
                                            role="checkbox"
                                            // aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={id}
                                            // selected={isItemSelected}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <TableCell
                                                align="center"
                                                component="th"
                                                id={assignee.name}
                                                scope="row"
                                                padding="none"
                                                sx={{
                                                    fontSize: "clamp(10px, 1.5vw, 16px)",
                                                    backgroundColor: assignee.id === assigneeId ? '#1976d2' : undefined,
                                                    color: assignee.id === assigneeId ? '#ffffff' : undefined,
                                                    p: 1
                                                }}
                                            >
                                                {assignee.name}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    backgroundColor: assignee.id === assigneeId ? '#1976d2' : undefined,
                                                    color: assignee.id === assigneeId ? '#ffffff' : undefined,
                                                }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => assignee.id && props.handleDelete(assignee.id)}
                                                    sx={{ fontSize: "clamp(10px, 1.5vw, 16px)" }}
                                                >
                                                    <DeleteIcon sx={{ width: 'clamp(15px, 1.5vw, 16px)' }} />
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
                        count={assignees.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </Modal>
    )
}