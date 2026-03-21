import React from 'react';
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Typography } from "@mui/material";
import { Assignee } from '@/pages/dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AssigneeList from './AssigneeList';
import TableFunctionList from './TableFunctionList';

interface SideDrawerProps {
    fromReduxFromAssignee: Assignee,
    openAddNewAccountModal: boolean,
    setOpenAddNewAccountModal: (open: boolean) => void,
    sidebarWidth: number,
    openSidebar: boolean,
    setOpenSideBar: (open: boolean) => void,
}

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

function SideDrawer(props: SideDrawerProps) {

    return (
        <Box
            component="nav"
            sx={{
                width: props.openSidebar ? props.sidebarWidth : '70px',
                bgcolor: '#F4F4F4',
                height: '100vh',
                position: 'absolute',
                borderRadius: '20px',
                left: 0,
                top: 0,
                p: 2,
            }}
        >
            <IconButton
                onClick={() => props.setOpenSideBar(true)}
                size="small"
                aria-controls={props.openSidebar ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={props.openSidebar ? 'true' : undefined}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                variant="persistent"
                anchor="left"
                open={props.openSidebar}
                slotProps={{
                    paper: {
                        sx: {
                            position: 'absolute',
                            width: props.sidebarWidth,
                            height: '100%',
                            backgroundColor: 'palette.background.paper',
                            color: 'white',
                            borderRadius: '20px'
                        }
                    }
                }}
                sx={{
                    width: props.openSidebar ? props.sidebarWidth : 0,
                    flexShrink: 0,
                    transition: 'width 0.3s ease',
                    '& .MuiDrawer-paper': { boxSizing: 'border-box' },
                }}
            >
                <DrawerHeader
                    sx={{
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography variant='h2'>Menu</Typography>
                    <IconButton onClick={() => props.setOpenSideBar(false)}>
                        <ChevronLeftIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <AssigneeList
                    fromReduxFromAssignee={props.fromReduxFromAssignee}
                    setOpenAddNewAccountModal={props.setOpenAddNewAccountModal}
                    openAddNewAccountModal={props.openAddNewAccountModal}
                />
                <Divider />
                <TableFunctionList />
            </Drawer>
        </Box>
    )
}

export default SideDrawer