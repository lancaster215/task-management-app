import { Avatar, Box, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Tooltip } from "@mui/material"
import AddNewAccountModal from "../modal/addNewAccount"
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Data, Order } from '@/types/tableTypes';
import PersonAdd from '@mui/icons-material/PersonAdd';
import EnhancedTableHead from "../custom_components/EnhancedTableHead";
import { useDispatch, useSelector } from "react-redux";
import { setAssignee } from "@/store/taskSlice";
import { RootState } from "@/store";
import { User } from "../Dashboard";
import { useRouter } from "next/router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BASE_URL } from "../constants/baseURL";

export default function AssigneeTable() {
    const dispatch = useDispatch();
    const { assignee } = useSelector((state: RootState) => state.task)
    const router = useRouter()
    const [openAddNewAccountModal, setOpenAddNewAccountModal] = useState<boolean>(false);
    const [newUser, setNewUser] = useState<User>({
        id: '',
        name: '',
    })
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Data | 'action'>('status');
    const [userAssignee, setUserAssignee] = useState<User[]>([])
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [assigneeId, setAssigneeId] = useState<string>(assignee.id);

    useEffect(() => {
        const fetchAssignees = async () => {
            const res = await fetch(`${BASE_URL}/api/users`);
            const latestUserAssignee = await res.json();
            setUserAssignee(latestUserAssignee);
        };

        fetchAssignees();
    },[])

    const handleClickAnchor = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOnSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        try {
            const payload = { 
                id: uuidv4(),
                name: newUser.name,
            }
            await fetch(`${BASE_URL}/api/addUser`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(payload)
            })
            const res = await fetch(`${BASE_URL}/api/users`);
            const latestUserAssignee = await res.json();
            setUserAssignee(latestUserAssignee);
        } catch(err) {
            console.error(`Error in adding user: ${err}`)
        }
        setOpenAddNewAccountModal(!openAddNewAccountModal)
    }

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data | 'action',
    ) => {
        const noSortHeaders = ['title', 'description', 'tags', 'dueDate']
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        
        if(!noSortHeaders.includes(property)){
            setOrderBy(property);
        }
    };

    const handleClick = (name: string, id: string) => {
        dispatch(setAssignee({ name, id }))
        setAssigneeId(id)
    };
    
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    return(
        <Box sx={{ position: 'relative', justifyContent: 'center', display: 'flex' }}>
            <Box sx={{ mx: '100px', mt: '10px', maxWidth: '50%'}}>
                <AddNewAccountModal
                    openAddNewAccountModal={openAddNewAccountModal}
                    setOpenAddNewAccountModal={setOpenAddNewAccountModal}
                    handleOnSubmit={handleOnSubmit}
                    onNoButton={() => setOpenAddNewAccountModal(!openAddNewAccountModal)}
                    newUser={newUser}
                    setNewUser={setNewUser}
                />
                <Box sx={{justifyContent: 'space-between', display: 'flex'}}>
                    <ArrowBackIcon onClick={() => router.push('/')} sx={{cursor: 'pointer'}}/>
                    <Tooltip title="All Tasks">
                        <IconButton
                            onClick={handleClickAnchor}
                            size="small"
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        slotProps={{
                            paper: {
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                                },
                                '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                                },
                            },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                        {/* <MenuItem onClick={handleClose}>
                            <Avatar /> <ListItemText>{assignee.name}</ListItemText>
                        </MenuItem> */}
                        <Divider />
                        <MenuItem onClick={() => router.push('/')}>
                            <ListItemText>All Tasks</ListItemText>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={() => setOpenAddNewAccountModal(!openAddNewAccountModal)}>
                            <ListItemIcon>
                                <PersonAdd fontSize="small" />
                            </ListItemIcon>
                            Add assignee
                        </MenuItem>
                    </Menu>
                </Box>
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
                                {userAssignee.map((assignee, id) => {
                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(assignee.name, assignee.id)}
                                            role="checkbox"
                                            // aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={id}
                                            // selected={isItemSelected}
                                            sx={{ cursor: 'pointer'}}
                                        >
                                            <TableCell
                                                component="th"
                                                id={assignee.name}
                                                scope="row"
                                                padding="none"
                                                sx={{
                                                    fontSize: "clamp(10px, 1.5vw, 16px)", 
                                                    backgroundColor: assignee.id === assigneeId ? '#1976d2': undefined,
                                                    color: assignee.id === assigneeId ? '#ffffff' : undefined,
                                                    p: 1
                                                }}
                                            >
                                                {assignee.name}
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
                        count={userAssignee.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </Box>
    )
}